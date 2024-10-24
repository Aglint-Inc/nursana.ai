import 'server-only';

import { type ApplicantProcedure, applicantProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const query = async ({ ctx: { user_id } }: ApplicantProcedure) => {
  const supabase = createPrivateClient();
  const { data } = await supabase
    .from('preferred_job_titles')
    .select('*')
    .eq('applicant_id', user_id);
  return { preferredJobTitle: data ?? [] };
};

export const getPreferredJobTitles = applicantProcedure.query(query);
