import { type SupabaseClient } from '@supabase/supabase-js';
import { type z } from 'zod';

import { createPublicClient } from '@/db/client';
import type { DB } from '@/db/types';
import { type nerseTitlesSchema, type nurseLicenseSchema } from '@/db/zod';
import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';

import { campaignFormDataSchemaWithoutResume } from '../schema/upload';

const mutation = async ({
  input: {
    email,
    first_name,
    campaign_id,
    user_id,
    applicant_id,
    role,
    licenses,
    current_company,
    current_job_title,
  },
}: PublicProcedure<typeof campaignFormDataSchemaWithoutResume>) => {
  const db = createPublicClient();

  let userId: string | null = user_id ?? null;
  let applicantId: string | null = applicant_id ?? null;

  if (!user_id) {
    const resUser = await createUser({
      db,
      email,
      first_name,
      role,
      licenses,
      current_company,
      current_job_title,
    });

    userId = resUser.userId;
    applicantId = resUser.applicant.id;
  }

  if (!userId || !applicantId || !campaign_id) throw new Error();

  const resIntCreate = await createInterview({
    db,
    campaign_id,
    applicant_id: applicantId,
  });

  return {
    interview_id: resIntCreate.id,
  };
};

export const uploadCampaignWithoutResume = publicProcedure
  .input(campaignFormDataSchemaWithoutResume)
  .mutation(mutation);

const createInterview = async ({
  db,
  campaign_id,
  applicant_id,
}: {
  db: SupabaseClient<DB>;
  campaign_id: string;
  applicant_id: string;
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

  const [interviewResult] = await Promise.all([
    db
      .from('interview')
      .insert({
        applicant_id,
        interview_stage: 'not_started',
        name: campaign.name,
        campaign_id: campaign.id,
        agency_id: campaign.agency_id,
        version_id: campaign.version_id,
      })
      .select('*,version!inner(*)')
      .single()
      .throwOnError(),
  ]);

  const interview = interviewResult.data;
  if (!interview) throw new Error('Error creating interview');
  return interview;
};

const createUser = async ({
  db,
  email,
  first_name,
  role,
  licenses,
  current_job_title,
  current_company,
}: {
  db: SupabaseClient<DB>;
  email: string;
  first_name: string;
  role: z.infer<typeof nerseTitlesSchema>;
  licenses: string | null;
  current_job_title: string | null | undefined;
  current_company: string | null | undefined;
}) => {
  const res = await db.auth.admin.createUser({
    email: email,
    password: 'Welcome@123',
    email_confirm: true,
  });

  const userId = res.data?.user?.id;

  if (!userId) throw new Error('User not created');
  await db
    .from('user')
    .insert({
      id: userId,
      email,
      first_name,
      user_role: 'applicant_user',
    })
    .throwOnError();

  const applicant = (
    await db
      .from('applicant_user')
      .insert({
        id: userId,
        job_title: role,
        terms_accepted: true,
        licenses: licenses
          ? (JSON.parse(licenses) as z.infer<typeof nurseLicenseSchema>[])
          : null,
        current_job_title,
        current_company,
      })
      .select()
      .single()
      .throwOnError()
  ).data!;
  return { userId, applicant };
};
