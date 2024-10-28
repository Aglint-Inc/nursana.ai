import 'server-only';

import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { type AgencyProcedure, agencyProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const schema = z.object({
  version_id: z.string(),
});

const query = async ({ ctx, input }: AgencyProcedure<typeof schema>) => {
  const db = createPrivateClient();
  const version = (
    await db
      .from('version')
      .select('*,template!inner(*)')
      .eq('id', input.version_id)
      .eq('agency_id', ctx.agency.id)
      .single()
      .throwOnError()
  ).data;

  if (!version)
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Version not found',
    });

  return version;
};

export const read = agencyProcedure.input(schema).query(query);
