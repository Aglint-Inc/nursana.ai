import 'server-only';

import { TRPCError } from '@trpc/server';

import {
  InterviewProcedure,
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
        '*, interview_analysis!interview_analysis_interview_id_fkey(*), applicant_user!interview_applicant_id_fkey!inner(*, resume(*), user!applicant_user_id_fkey!inner(*))',
      )
      .eq('id', input.id)
      .eq('agency_id', ctx.agency.id)
      .single()
      .throwOnError()
  ).data;
  if (!data)
    throw new TRPCError({ code: 'NOT_FOUND', message: 'Interview not found' });
  const {
    applicant_user: { user, resume, ...applicant_user },
    interview_analysis,
    ...interview
  } = data;
  return {
    interview,
    interview_analysis,
    resume,
    applicant: {
      ...applicant_user,
      ...user,
    },
  };
};

export const read = interviewProcedure.query(query);

export type Read = ProcedureDefinition<typeof read>;
