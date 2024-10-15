/* eslint-disable no-console */
import { z } from "zod";

import { type PublicProcedure, publicProcedure } from "@/server/api/trpc";
import { createPublicClient } from "@/server/db";

export const schema = z.object({
  email: z.string().email(),
});

const mutation = async ({
  input: { email },
}: PublicProcedure<typeof schema>) => {
  const supabase = createPublicClient();

  const res = await supabase.auth.admin.createUser({
    email: email,
    password: "Welcome@123",
  });

  return res;
};

export const createUser = publicProcedure.input(schema).mutation(mutation);
