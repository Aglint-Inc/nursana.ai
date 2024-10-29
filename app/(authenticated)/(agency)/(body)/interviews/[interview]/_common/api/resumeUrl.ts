import 'server-only';

import { TRPCError } from '@trpc/server';

import {
  type InterviewProcedure,
  interviewProcedure,
} from '@/interview/utils/interviewProcedure';
import { type ProcedureDefinition } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

const query = async ({ ctx, input }: InterviewProcedure) => {
  const db = createPublicClient();

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

  if (!data?.applicant_user.resume.file_url)
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Resume url not found',
    });

  const url = data.applicant_user.resume.file_url;
  const filename = url.split('resumes/')[1];

  if (!filename)
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Invalid filename',
    });

  const response = await db.storage
    .from('resumes')
    .createSignedUrl(filename, process.env.NEXT_PUBLIC_PUBLIC_URL_EXP);

  if (response.error || !response.data) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Error signing url',
    });
  }

  const { signedUrl } = response.data;

  return signedUrl;
};

export const resumeUrl = interviewProcedure.query(query);

export type ResumeUrl = ProcedureDefinition<typeof resumeUrl>;
