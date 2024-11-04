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
  const { applicant_id } = data;
  const user = (
    await db
      .from('user')
      .select()
      .eq('id', applicant_id)
      .single()
      .throwOnError()
  ).data!;

  return { ...data, user };
};

export const read = interviewProcedure.query(query);

export type Read = ProcedureDefinition<typeof read>;
