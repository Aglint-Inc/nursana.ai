import 'server-only';

import { z } from 'zod';

import { type ApplicantProcedure, applicantProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

export const schema = z.object({
  location_id: z.string(),
});

const mutation = async ({
  ctx: { user_id },
  input: { location_id },
}: ApplicantProcedure<typeof schema>) => {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from('preferred_locations')
    .insert({
      applicant_id: user_id,
      location_id: location_id,
    })
    .select()
    .throwOnError();
  return data;
};

export const createPreferredJobLocations = applicantProcedure
  .input(schema)
  .mutation(mutation);
