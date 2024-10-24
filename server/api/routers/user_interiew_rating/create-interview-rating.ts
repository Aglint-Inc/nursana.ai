import 'server-only';

import { z } from 'zod';

import { type ApplicantProcedure, applicantProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

export const schema = z.object({
  rating: z.number(),
  feedback: z.string(),
});

const mutation = async ({
  ctx: { user_id: applicant_id },
  input: { feedback, rating },
}: ApplicantProcedure<typeof schema>) => {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from('user_interview_rating')
    .insert({
      rating,
      applicant_id,
      feedback,
    })
    .select()
    .throwOnError();
  if (data) {
    return { interviewRating: data[0] ?? null };
  } else {
    {
      return { interviewRating: null };
    }
  }
};

export const createInterviewRating = applicantProcedure
  .input(schema)
  .mutation(mutation);
