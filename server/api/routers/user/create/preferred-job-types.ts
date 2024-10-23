import 'server-only';

/* eslint-disable no-console */
import { z } from 'zod';

import { type ApplicantProcedure, applicantProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';
import { jobTypesSchema } from '@/supabase-types/zod-schema.types';

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
