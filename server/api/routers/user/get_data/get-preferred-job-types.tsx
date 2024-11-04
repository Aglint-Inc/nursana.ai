import 'server-only';

import { createPrivateClient } from '@/db/client';
import { type ApplicantProcedure, applicantProcedure } from '@/server/api/trpc';

const query = async ({ ctx: { user_id } }: ApplicantProcedure) => {
  const supabase = createPrivateClient();
  const { data } = await supabase
    .from('preferred_job_types')
    .select()
    .eq('applicant_id', user_id);
  return { preferredJobTypes: data ?? [] };
};

export const getPreferredJobTypes = applicantProcedure.query(query);
