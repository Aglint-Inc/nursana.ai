import 'server-only';

import { z } from 'zod';

import { createPublicClient } from '@/db/client';
import { type ApplicantProcedure, applicantProcedure } from '@/server/api/trpc';

export const schema = z.object({
  place_id: z.string(),
});

const mutation = async ({
  ctx: { user_id },
  input: { place_id },
}: ApplicantProcedure<typeof schema>) => {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from('preferred_locations')
    .delete()
    .eq('place_id', place_id)
    .eq('applicant_id', user_id)
    .select()
    .throwOnError();
  return { deletedPreferredJobLocations: data };
};

export const deletePreferredJobLocations = applicantProcedure
  .input(schema)
  .mutation(mutation);
