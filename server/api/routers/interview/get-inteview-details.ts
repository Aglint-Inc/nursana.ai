import 'server-only';

import { z } from 'zod';

import { supabase } from '@/utils/supabase/client';

import { type ApplicantProcedure, applicantProcedure } from '../../trpc';

const schema = z.object({
  interview_id: z.string(),
});

const query = async ({ ctx, input }: ApplicantProcedure<typeof schema>) => {
  const { interview_id } = input;
  const { data: interview } = await supabase
    .from('interview')
    .select('*')
    .eq('user_id', ctx.user_id)
    .eq('id', interview_id)
    .single();

  return interview!;
};

export const getInterviewDetails = applicantProcedure
  .input(schema)
  .query(query);
