import 'server-only';

import { createPrivateClient } from '@/db/client';
import { type ApplicantProcedure, applicantProcedure } from '@/server/api/trpc';

const query = async ({ ctx: { user_id } }: ApplicantProcedure) => {
  const supabase = createPrivateClient();
  const { data, error } = await supabase
    .from('user_interview_rating')
    .select('*')
    .eq('applicant_id', user_id)
    .throwOnError();
  if (error) {
    return { interviewRating: null };
  }
  if (data) {
    return { interviewRating: data[0] ?? null };
  } else {
    return { interviewRating: null };
  }
};

export const getUserInterviewRating = applicantProcedure.query(query);
