import 'server-only';

import { type ApplicantProcedure, applicantProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const query = async ({ ctx: { user_id } }: ApplicantProcedure) => {
  const supabase = createPrivateClient();
  const { data } = await supabase
    .from('user_interview_rating')
    .select('*')
    .eq('applicant_id', user_id)
    .throwOnError();
  if (data) {
    return { interviewRating: data[0] ?? null };
  } else {
    return { interviewRating: null };
  }
};

export const getUserInterviewRating = applicantProcedure.query(query);
