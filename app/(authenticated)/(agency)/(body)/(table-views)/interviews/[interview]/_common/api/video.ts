import 'server-only';

import { TRPCError } from '@trpc/server';

import { createPublicClient } from '@/db/client';
import {
  type InterviewProcedure,
  interviewProcedure,
} from '@/interview/utils/interviewProcedure';
import { type ProcedureDefinition } from '@/server/api/trpc';

const query = async ({ ctx, input }: InterviewProcedure) => {
  const db = createPublicClient();

  const data = (
    await db
      .from('interview')
      .select(
        'interview_analysis!interview_analysis_interview_id_fkey!inner(video_url)',
      )
      .eq('id', input.id)
      .eq('agency_id', ctx.agency.id)
      .single()
      .throwOnError()
  ).data;

  if (!data?.interview_analysis.video_url)
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Audio not found',
    });

  const url = data.interview_analysis.video_url;
  const filename = url.split('videos/')[1];

  if (!filename)
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Invalid filename',
    });

  const response = await db.storage
    .from('videos')
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

export const video = interviewProcedure.query(query);

export type Video = ProcedureDefinition<typeof video>;