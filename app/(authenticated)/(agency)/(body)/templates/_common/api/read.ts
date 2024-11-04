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
  const templates = (
    await db
      .from('template')
      .select('*,version(*)')
      .eq('agency_id', ctx.agency.id)
      .throwOnError()
  ).data;

  if (!templates)
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Templates not founc',
    });
  return templates;
};

export const read = agencyProcedure.query(query);

export type Read = ProcedureDefinition<typeof read>;
