import 'server-only';

import { TRPCError } from '@trpc/server';

import { createPrivateClient } from '@/db/client';
import {
  type AgencyProcedure,
  agencyProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

const query = async ({ ctx }: AgencyProcedure) => {
  const db = createPrivateClient();
  const campaigns = (
    await db
      .from('campaign')
      .select('id, name, description, campaign_code, status')
      .eq('agency_id', ctx.agency.id)
      .throwOnError()
  ).data;
  if (!campaigns)
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Campaigns not found',
    });
  return campaigns;
};

export const read = agencyProcedure.query(query);

export type Read = ProcedureDefinition<typeof read>;
