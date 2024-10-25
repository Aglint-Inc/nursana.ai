import 'server-only';

import { TRPCError } from '@trpc/server';

import {
  type AgencyProcedure,
  agencyProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';
import { interviewRowSchema } from '@/supabase-types/zod-schema.types';

const schema = interviewRowSchema.pick({ id: true });

const query = async ({ ctx, input }: AgencyProcedure<typeof schema>) => {
  const db = createPrivateClient();
  const data = (
    await db
      .from('interview')
      .select()
      .eq('id', input.id)
      .eq('agency_id', ctx.agency.id)
      .single()
      .throwOnError()
  ).data;
  if (!data)
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Interview not found',
    });
  return data;
};

export const read = agencyProcedure.input(schema).query(query);

export type Read = ProcedureDefinition<typeof read>;
