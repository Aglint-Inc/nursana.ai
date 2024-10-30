import 'server-only';

import { z } from 'zod';

import { jobTypesSchema } from '@/db/zod';
import { type ApplicantProcedure, applicantProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

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
    .delete()
    .eq('job_type', job_type)
    .eq('applicant_id', user_id)
    .select()
    .throwOnError();
  return { deletedPreferredJobTypes: data };
};

export const deletePreferredJobTypes = applicantProcedure
  .input(schema)
  .mutation(mutation);
