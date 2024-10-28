import { createPrivateClient } from '@/server/db';
import { TRPCError } from '@trpc/server';
import {
  interviewProcedure,
  InterviewProcedure,
} from '@/interview/utils/interviewProcedure';
import { ProcedureDefinition } from '@/server/api/trpc';

const query = async ({ ctx, input }: InterviewProcedure) => {
  const db = createPrivateClient();
  const interview = (
    await db
      .from('interview')
      .select(
        'applicant_user!interview_applicant_id_fkey!inner(*, user!applicant_user_id_fkey!inner(*))',
      )
      .eq('id', input.id)
      .eq('agency_id', ctx.agency.id)
      .single()
      .throwOnError()
  ).data;
  if (!interview)
    throw new TRPCError({ code: 'NOT_FOUND', message: 'Interview not found' });
  const {} = interview;
  return interview;
};

export const home = interviewProcedure.query(query);

export type Home = ProcedureDefinition<typeof home>;
