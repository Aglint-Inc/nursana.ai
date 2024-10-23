import 'server-only';

import { z } from 'zod';

import { type ApplicantProcedure, applicantProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

export const schema = z.object({
  city: z.string(),
  country: z.string(),
  state: z.string(),
});

const mutation = async ({
  ctx: { user_id },
  input: { city, country, state },
}: ApplicantProcedure<typeof schema>) => {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from('preferred_locations')
    .insert({
      applicant_id: user_id,
      city,
      country,
      state,
    })
    .select()
    .throwOnError();
  return data;
};

export const createPreferredJobLocations = applicantProcedure
  .input(schema)
  .mutation(mutation);
