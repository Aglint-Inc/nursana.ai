import 'server-only';

import { z } from 'zod';

import { createPublicClient } from '@/db/client';
import { jobTypesSchema } from '@/db/zod';
import { type ApplicantProcedure, applicantProcedure } from '@/server/api/trpc';

export const schema = z.object({
  job_type: jobTypesSchema,
});

const mutation = async ({
  ctx: { user_id },
  input: { job_type },
}: ApplicantProcedure<typeof schema>) => {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from('preferred_job_types')
    .insert({
      applicant_id: user_id,
      job_type: job_type,
    })
    .select()
    .throwOnError();
  return data;
};

export const createPreferredJobTypes = applicantProcedure
  .input(schema)
  .mutation(mutation);
