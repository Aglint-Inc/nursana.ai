import 'server-only';

import { z } from 'zod';

import { type ApplicantProcedure, applicantProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';
import { nerseTitlesSchema } from '@/supabase-types/zod-schema.types';

export const schema = z.object({
  job_titles: nerseTitlesSchema,
});

const mutation = async ({
  ctx: { user_id },
  input: { job_titles },
}: ApplicantProcedure<typeof schema>) => {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from('preferred_job_titles')
    .insert({
      applicant_id: user_id,
      job_titles: job_titles,
    })
    .select()
    .throwOnError();
  return data;
};

export const createPreferredJobTitles = applicantProcedure
  .input(schema)
  .mutation(mutation);
