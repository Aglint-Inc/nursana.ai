import 'server-only';

import { TRPCError } from '@trpc/server';

import {
  type InterviewProcedure,
  interviewProcedure,
} from '@/interview/utils/interviewProcedure';
import { type ProcedureDefinition } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const query = async ({ ctx, input }: InterviewProcedure) => {
  const db = createPrivateClient();
  const data = (
    await db
      .from('interview')
      .select(
        'interview_analysis!interview_analysis_interview_id_fkey!inner(*)',
      )
      .eq('id', input.id)
      .eq('agency_id', ctx.agency.id)
      .single()
      .throwOnError()
  ).data;
  if (!data)
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Analysis not found',
    });
  return data.interview_analysis;
};

export const analysis = interviewProcedure.query(query);

export type Analysis = ProcedureDefinition<typeof analysis>;
