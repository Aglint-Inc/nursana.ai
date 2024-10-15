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
  const db = createPublicClient();
  const user = (
    await db
      .from("users")
      .select("*")
      .eq("email", email)
      .single()
      .throwOnError()
  ).data;

  if (!user) return false;

  const role = (
    await db
      .from("user_roles")
      .select("*")
      .eq("user_id", user.id)
      .single()
      .throwOnError()
  ).data;

  if (role?.role === "nurse") {
    return true;
  } else {
    return false;
  }
};

export const userCheck = publicProcedure.input(schema).mutation(mutation);
