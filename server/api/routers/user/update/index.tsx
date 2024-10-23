import 'server-only';

import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';
import {
  jobTitlesSchema,
  travelPreferrenceSchema,
} from '@/supabase-types/zod-schema.types';

// Define the Zod schema for form validation
export const userProfileSchema = z.object({
  first_name: z.string().min(2, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required').nullable().optional(),
  phone_number: z.string().min(10, 'Phone number must be at least 10 digits'),
  preferred_travel_preference: travelPreferrenceSchema,
  salary_range: z.string().nullable(),
  current_job_title: jobTitlesSchema,
  open_to_work: z.boolean(),
});

const mutation = async ({
  ctx,
  input,
}: PrivateProcedure<typeof userProfileSchema>) => {
  const { user_id } = ctx;
  const db = createPrivateClient();

  const { data, error } = await db
    .from('applicant')
    .update({
      ...input,
    })
    .eq('id', user_id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  if (!data) throw new Error('Failed to update preferences');

  return data;
};

export const updateUser = privateProcedure
  .input(userProfileSchema)
  .mutation(mutation);
