import 'server-only';

import { TRPCError } from '@trpc/server';

import { createPrivateClient } from '@/db/client';
import {
  type InterviewProcedure,
  interviewProcedure,
} from '@/interview/utils/interviewProcedure';
import { type ProcedureDefinition } from '@/server/api/trpc';

const query = async ({ ctx, input }: InterviewProcedure) => {
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
    throw new TRPCError({ code: 'NOT_FOUND', message: 'Interview not found' });
  return data;
};

export const read = interviewProcedure.query(query);

export type Read = ProcedureDefinition<typeof read>;
