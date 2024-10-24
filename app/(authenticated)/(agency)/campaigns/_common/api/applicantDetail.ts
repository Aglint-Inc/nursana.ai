import 'server-only';

import { TRPCError } from '@trpc/server';

import {
  type AgencyProcedure,
  agencyProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';
import { z } from 'zod';

const schema = z.object({
  applicant_id: z.string(),
});

const query = async ({
  input: { applicant_id },
}: AgencyProcedure<typeof schema>) => {
  const db = createPrivateClient();
  console.log('applicant_id : ', applicant_id);

  const [userResult, resumeResult, analysisResult, interviewResult] =
    await Promise.all([
      db
        .from('applicant_user')
        .select('*, user!applicant_user_id_fkey!inner(*)')
        .eq('id', applicant_id)
        .single(),
      db.from('resume').select('*').eq('applicant_id', applicant_id).single(),

      db
        .from('interview_analysis')
        .select('*')
        .eq('applicant_id', applicant_id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single(),
      db
        .from('interview')
        .select('*')
        .eq('applicant_id', applicant_id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single(),
    ]);

  const user = userResult.data!;
  const resume = resumeResult.data!;
  const analysis = analysisResult.data!;
  const interview = interviewResult.data!;

  console.log(user, resume, analysis, interview);
  return {
    user,
    resume,
    analysis,
    interview,
  };
};

export const get_applicant_detail = agencyProcedure.input(schema).query(query);

export type Read = ProcedureDefinition<typeof get_applicant_detail>;
