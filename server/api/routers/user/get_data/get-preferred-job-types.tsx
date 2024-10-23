import 'server-only'; /* eslint-disable no-console */

import { applicantProcedure, ApplicantProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const query = async ({ ctx: { user_id } }: ApplicantProcedure) => {
  const supabase = createPrivateClient();
  const { data } = await supabase
    .from('preferred_job_types')
    .select()
    .eq('applicant_id', user_id);
  return { preferredJobTypes: data ?? [] };
};

export const getPreferredJobTypes = applicantProcedure.query(query);
