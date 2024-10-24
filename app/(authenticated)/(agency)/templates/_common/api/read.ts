import 'server-only';

import { TRPCError } from '@trpc/server';

import {
  type HospitalProcedure,
  hospitalProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const query = async ({ ctx }: HospitalProcedure) => {
  const db = createPrivateClient();
  const templates = (
    await db
      .from('template')
      .select('*,version(*)')
      .eq('hospital_id', ctx.hospital.id)
      .throwOnError()
  ).data;

  if (!templates)
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Templates not founc',
    });
  return templates;
};

export const read = hospitalProcedure.query(query);

export type Read = ProcedureDefinition<typeof read>;
