import 'server-only';

import { createPrivateClient } from '@/db/client';
import { type ApplicantProcedure, applicantProcedure } from '@/server/api/trpc';

const query = async ({ ctx: { user_id } }: ApplicantProcedure) => {
  const supabase = createPrivateClient();
  const { data } = await supabase
    .from('applicant_user')
    .select()
    .eq('id', user_id)
    .single();
  return data;
};

export const getProfessionalInfo = applicantProcedure.query(query);
