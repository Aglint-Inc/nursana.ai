import 'server-only';

/* eslint-disable no-console */
import { z } from 'zod';

import { createPublicClient } from '@/db/client';
import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';

export const schema = z.object({
  code: z.string(),
});

const query = async ({ input: { code } }: PublicProcedure<typeof schema>) => {
  const db = createPublicClient();
  const campaign = (
    await db
      .from('campaign')
      .select('*')
      .eq('campaign_code', code)
      .single()
      .throwOnError()
  ).data;

  return campaign;
};

export const campaignCheck = publicProcedure.input(schema).query(query);
