import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from "@/server/api/trpc";
import { createPrivateClient } from "@/server/db";

export const schema = z.object({
  preferred_job_titles: z.array(z.string()),
  preferred_locations: z.array(z.string()),
  job_type: z.string(),
  travel_preference: z.string(),
  expected_salary: z.number().nullable(),
});

const mutation = async ({
  ctx,
  input,
}: PrivateProcedure<typeof schema>) => {
  const { user_id } = ctx;
  const db = createPrivateClient();

  const { data, error } = await db
    .from("users")
    .update({
      preferred_job_titles: input.preferred_job_titles,
      preferred_locations: input.preferred_locations,
      job_type: input.job_type,
      travel_preference: input.travel_preference,
      expected_salary: input.expected_salary,
      profile_status: "preferences_updated",
    })
    .eq("id", user_id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("Failed to update preferences");

  return data;
};

export const updatePreferences = privateProcedure.input(schema).mutation(mutation);