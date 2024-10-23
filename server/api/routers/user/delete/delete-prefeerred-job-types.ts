import 'server-only';

import { z } from 'zod';

import { type ApplicantProcedure, applicantProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

export const schema = z.object({
  id: z.string(),
});

const mutation = async ({
  input: { id },
}: ApplicantProcedure<typeof schema>) => {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from('preferred_job_types')
    .delete()
    .eq('id', id)
    .select()
    .throwOnError();
  return { deletedPreferredJobTypes: data };
};

export const deletePreferredJobTypes = applicantProcedure
  .input(schema)
  .mutation(mutation);
