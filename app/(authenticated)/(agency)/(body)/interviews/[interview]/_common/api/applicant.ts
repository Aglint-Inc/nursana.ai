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
        'applicant_user!interview_applicant_id_fkey!inner(*, user!applicant_user_id_fkey!inner(*))',
      )
      .eq('id', input.id)
      .eq('agency_id', ctx.agency.id)
      .single()
      .throwOnError()
  ).data;
  if (!data)
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Applicant not found',
    });
  const {
    applicant_user: { user, ...applicant_user },
  } = data;
  return {
    ...applicant_user,
    ...user,
  };
};

export const applicant = interviewProcedure.query(query);

export type Applicant = ProcedureDefinition<typeof applicant>;
