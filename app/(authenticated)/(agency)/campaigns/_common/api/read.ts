import 'server-only';

import { TRPCError } from '@trpc/server';

import {
  type AgencyProcedure,
  agencyProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

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
      message: 'Campaigns not founc',
    });
  return campaigns;
};

export const read = agencyProcedure.query(query);

export type Read = ProcedureDefinition<typeof read>;
