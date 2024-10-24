import 'server-only'; /* eslint-disable no-console */

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const query = async ({ ctx: { user_id } }: PrivateProcedure) => {
  const db = createPrivateClient();
  const [userResult, resumeResult, interviewResult, analysisResult] =
    await Promise.all([
      db
        .from('applicant_user')
        .select('*, user!applicant_user_id_fkey!inner(*)')
        .eq('id', user_id)
        .single(),
      db.from('resume').select('*').eq('user_id', user_id).single(),
      db
        .from('interview')
        .select('*')
        .eq('user_id', user_id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single(),
      db
        .from('interview_analysis')
        .select('*')
        .eq('user_id', user_id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single(),
    ]);
  return {
    applicant_user: userResult.data,
    resume: resumeResult.data,
    interview: interviewResult.data,
    analysis: analysisResult.data,
  };
};

export const getData = privateProcedure.query(query);
