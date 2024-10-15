/* eslint-disable no-console */
import { z } from "zod";

import { type PublicProcedure, publicProcedure } from "@/server/api/trpc";
import { createPublicClient } from "@/server/db";

export const schema = z.object({
  code: z.string(),
});

const query = async ({ input: { code } }: PublicProcedure<typeof schema>) => {
  const db = createPublicClient();
  const campaign = (
    await db
      .from("campaigns")
      .select("*")
      .eq("campaign_code", code)
      .single()
      .throwOnError()
  ).data;

  return campaign;
};

export const campaignCheck = publicProcedure.input(schema).query(query);
