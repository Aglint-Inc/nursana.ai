import 'server-only';

import { z } from 'zod';

import { type ApplicantProcedure, applicantProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';
import { nerseTitlesSchema } from '@/supabase-types/zod-schema.types';

export const schema = z.object({
  job_title: nerseTitlesSchema,
});

const mutation = async ({
  ctx: { user_id },
  input: { job_title },
}: ApplicantProcedure<typeof schema>) => {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from('preferred_job_titles')
    .insert({
      applicant_id: user_id,
      job_title: job_title,
    })
    .select()
    .throwOnError();
  return data;
};

export const createPreferredJobTitles = applicantProcedure
  .input(schema)
  .mutation(mutation);
