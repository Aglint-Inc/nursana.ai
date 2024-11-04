import 'server-only';

import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createPrivateClient } from '@/db/client';
import { type AgencyProcedure, agencyProcedure } from '@/server/api/trpc';

const schema = z.object({
  id: z.string(),
});

const query = async ({ ctx, input }: AgencyProcedure<typeof schema>) => {
  const db = createPrivateClient();
  const campaign = (
    await db
      .from('campaign')
      .select('*, version!inner(*)')
      .eq('id', input.id)
      .eq('agency_id', ctx.agency.id)
      .single()
      .throwOnError()
  ).data;
  if (!campaign)
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Campaign not found',
    });
  return campaign;
};

export const read = agencyProcedure.input(schema).query(query);
