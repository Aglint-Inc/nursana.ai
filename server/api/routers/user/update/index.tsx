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
  first_name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(30, 'Name must be at most 30 characters long'),
  last_name: z.string().nullable().optional(),
  phone_number: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .nullable()
    .optional(),
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

  const { data } = await db
    .from('applicant')
    .update({
      ...input,
    })
    .eq('id', user_id)
    .select()
    .throwOnError();

  return data;
};

export const updateUser = privateProcedure
  .input(userProfileSchema)
  .mutation(mutation);
