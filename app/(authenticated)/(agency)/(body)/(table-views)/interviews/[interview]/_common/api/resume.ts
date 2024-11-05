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
      .select(
        'applicant_user!interview_applicant_id_fkey!inner(resume!resume_applicant_id_fkey!inner(*))',
      )
      .eq('id', input.id)
      .eq('agency_id', ctx.agency.id)
      .single()
      .throwOnError()
  ).data;
  if (!data)
    throw new TRPCError({ code: 'NOT_FOUND', message: 'Resume not found' });
  return data.applicant_user.resume;
};

export const resume = interviewProcedure.query(query);

export type Resume = ProcedureDefinition<typeof resume>;
