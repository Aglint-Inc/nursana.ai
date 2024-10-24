import { type SupabaseClient } from '@supabase/supabase-js';
import { Readable } from 'stream';

import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';
import { type Database } from '@/supabase-types/database.types';
import { getSupabaseAdminServer } from '@/utils/supabase/supabaseAdmin';

import { campaignFormDataSchema } from '../schema/upload';

const mutation = async ({
  input: {
    email,
    first_name,
    last_name,
    image,
    campaign_id,
    fileExt,
    user_id,
    role,
  },
}: PublicProcedure<typeof campaignFormDataSchema>) => {
  const db = createPublicClient();

  const userId = user_id ?? (await createUser({ db, email }));

  await db
    .from('user')
    .insert({
      id: userId,
      email,
      first_name,
      last_name: last_name ?? undefined,
      user_role: 'applicant_user',
    })
    .throwOnError();

  const applicant = (
    await db
      .from('applicant_user')
      .insert({
        id: userId,
        job_title: role,
      })
      .select()
      .single()
      .throwOnError()
  ).data!;

  const fileName = `${campaign_id}/${applicant.id}_${Date.now()}.${fileExt}`;
  const resume_url = await upload(image, fileName);

  const resIntCreate = await createInterview({
    db,
    campaign_id,
    applicant_id: applicant.id,
    resume_url: resume_url.url,
  });

  return {
    interview_id: resIntCreate.id,
  };
};

export const uploadCampaign = publicProcedure
  .input(campaignFormDataSchema)
  .mutation(mutation);

const upload = async (file: File, fileName: string) => {
  const fileStream = Readable.fromWeb(
    // @ts-expect-error - unsure why this is not working
    file.stream(),
  );
  const bucketName = 'resumes';

  const supabase = getSupabaseAdminServer();

  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(fileName, fileStream, {
      cacheControl: '3600',
      upsert: false,
      duplex: 'half',
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucketName).getPublicUrl(fileName);

  return {
    url: publicUrl,
    name: file.name,
  };
};

const createInterview = async ({
  db,
  campaign_id,
  applicant_id,
  resume_url,
}: {
  db: SupabaseClient<Database>;
  campaign_id: string;
  applicant_id: string;
  resume_url: string;
}) => {
  const campaign = (
    await db
      .from('campaign')
      .select('*,version!inner(*)')
      .eq('id', campaign_id)
      .single()
      .throwOnError()
  ).data;

  if (!campaign) throw new Error('Campaign not found');

  const [resumeResult, interviewResult] = await Promise.all([
    db
      .from('resume')
      .insert({
        applicant_id,
        file_url: resume_url,
        structured_resume: null,
        campaign_id: campaign.id,
      })
      .select()
      .single()
      .throwOnError(),

    db
      .from('interview')
      .insert({
        applicant_id,
        interview_stage: 'resume_submitted',
        name: campaign.name,
        campaign_id: campaign.id,
        agency_id: campaign.agency_id,
        version_id: campaign.version_id,
      })
      .select('*,version!inner(*)')
      .single()
      .throwOnError(),
  ]);

  if (!resumeResult.data) throw new Error('Error uploading resume');

  const interview = interviewResult.data;
  if (!interview) throw new Error('Error creating interview');
  return interview;
};

const createUser = async ({
  db,
  email,
}: {
  db: SupabaseClient<Database>;
  email: string;
}) => {
  const res = await db.auth.admin.createUser({
    email: email,
    password: 'Welcome@123',
  });

  const userId = res.data?.user?.id;

  if (!userId) throw new Error('User not created');
  return userId;
};
