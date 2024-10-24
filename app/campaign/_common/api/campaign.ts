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
    .from('applicant')
    .insert({
      id: userId,
      email,
      first_name,
      last_name,
      current_job_title: role,
    })
    .throwOnError();

  await db
    .from('role')
    .insert({
      user_id: userId,
      role: 'applicant',
    })
    .throwOnError();

  const fileName = `${campaign_id}/${userId}_${Date.now()}.${fileExt}`;
  const resume_url = await upload(image, fileName);

  const resIntCreate = await createInterview({
    db,
    campaign_id,
    userId,
    resume_url: resume_url.url,
  });

  return resIntCreate;
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
  userId,
  resume_url,
}: {
  db: SupabaseClient<Database>;
  campaign_id: string;
  userId: string;
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
        user_id: userId,
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
        interview_stage: 'resume_submitted',
        name: campaign.name,
        user_id: userId,
        campaign_id: campaign.id,
        hospital_id: campaign.hospital_id,
        version_id: campaign.version_id,
        ai_ending_message: campaign.version.ai_ending_message,
        ai_instructions: [campaign.version.ai_instructions ?? ''],
        ai_interview_duration: campaign.version.ai_interview_duration,
        ai_questions: campaign.version.ai_questions,
        ai_welcome_message: campaign.version.ai_welcome_message,
        candidate_estimated_time: campaign.version.candidate_estimated_time,
        candidate_instructions: [campaign.version.candidate_instructions ?? ''],
        candidate_intro_video_cover_image_url:
          campaign.version.candidate_intro_video_cover_image_url,
        candidate_intro_video_url: campaign.version.candidate_intro_video_url,
        candidate_overview: [campaign.version.candidate_overview ?? ''],
      })
      .select()
      .single()
      .throwOnError(),
  ]);

  const updatedResume = resumeResult.data;
  if (!updatedResume) throw new Error('Error uploading resume');

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
