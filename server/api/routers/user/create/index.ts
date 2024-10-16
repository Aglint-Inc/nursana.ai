/* eslint-disable no-console */
import { z } from "zod";

import { type PublicProcedure, publicProcedure } from "@/server/api/trpc";
import { createPublicClient } from "@/server/db";

export const schema = z.object({
  email: z.string().email(),
  role: z.string(),
  first_name: z.string(),
  last_name: z.string().optional(),
});

const mutation = async ({
  input: { email, role, first_name, last_name },
}: PublicProcedure<typeof schema>) => {
  const supabase = createPublicClient();

  const res = await supabase.auth.admin.createUser({
    email: email,
    password: "Welcome@123",
  });

  const userId = res.data?.user?.id;

  if (!userId) throw new Error("User not created");

  await supabase
    .from("users")
    .insert({
      id: userId,
      email,
      first_name,
      last_name,
    })
    .throwOnError();

  await supabase
    .from("user_roles")
    .insert({
      user_id: userId,
      role: role as any,
    })
    .throwOnError();

  return res;
};

export const createUser = publicProcedure.input(schema).mutation(mutation);
