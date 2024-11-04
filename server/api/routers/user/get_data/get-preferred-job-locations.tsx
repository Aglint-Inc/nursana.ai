import 'server-only';

import { createPrivateClient } from '@/db/client';
import { type ApplicantProcedure, applicantProcedure } from '@/server/api/trpc';

const query = async ({ ctx: { user_id } }: ApplicantProcedure) => {
  const supabase = createPrivateClient();
  const { data } = await supabase
    .from('preferred_locations')
    .select('*,locations_list!inner(*)')
    .eq('applicant_id', user_id);
  return { preferredLocations: data ?? [] };
};

export const getPreferredJobLocations = applicantProcedure.query(query);
