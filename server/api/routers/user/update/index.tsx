import 'server-only';

import { z } from 'zod';

import { createPrivateClient } from '@/db/client';
import {
  nerseTitlesSchema,
  nurseLicenseSchema,
  travelPreferrenceSchema,
} from '@/db/zod';
import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';

// Define the Zod schema for form validation
export const userProfileSchema = z.object({
  first_name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(30, 'Name must be at most 30 characters long')
    .optional(),
  last_name: z.string().optional(),
  phone_number: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .nullable()
    .optional(),
  preferred_travel_preference: travelPreferrenceSchema.optional().nullable(),
  salary_range: z.string().nullable().optional(),
  job_title: nerseTitlesSchema.optional(),
  open_to_work: z.boolean().optional(),
  licenses: z.array(nurseLicenseSchema).nullable().optional(),
});

const mutation = async ({
  ctx,
  input: { first_name, last_name, ...applicant_user },
}: PrivateProcedure<typeof userProfileSchema>) => {
  const { user_id } = ctx;
  const db = createPrivateClient();

  await Promise.all([
    await db
      .from('user')
      .update({
        first_name,
        last_name,
      })
      .eq('id', user_id),

    await db
      .from('applicant_user')
      .update({
        ...applicant_user,
        salary_range: applicant_user.salary_range || '[0,0)',
      })
      .eq('id', user_id),
  ]);
};

export const updateUser = privateProcedure
  .input(userProfileSchema)
  .mutation(mutation);
