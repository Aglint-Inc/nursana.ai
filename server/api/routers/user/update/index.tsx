import 'server-only';

import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

// Define the Zod schema for form validation
export const userProfileSchema = z.object({
  first_name: z.string().min(2, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required').nullable().optional(),
  phone_number: z.string().min(10, 'Phone number must be at least 10 digits'),
  preferred_job_titles: z.array(z.string()).nullish().optional(),
  preferred_locations: z.array(z.string()).nullish().optional(),
  travel_preference: z.array(z.string()).nullish().optional(),
  expected_salary: z.string().nullable(),
  job_title: z.string().nullable(),
  job_type: z.array(z.string()).nullable(),
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
