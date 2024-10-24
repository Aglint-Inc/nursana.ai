import 'server-only';

import { z } from 'zod';

import { supabase } from '@/utils/supabase/client';

import { type ApplicantProcedure, applicantProcedure } from '../../trpc';

const schema = z.object({
  id: z.string(),
  interview_stage: z.enum([
    'interview_completed',
    'interview_inprogress',
    'not_started',
    'resume_submitted',
  ]),
});

const query = async ({ input }: ApplicantProcedure<typeof schema>) => {
  const { id, ...rest } = input;
  const { data, error } = await supabase
    .from('interview')
    .update({
      ...rest,
    })
    .eq('id', id)
    .select('*,version!inner(*)')
    .single();

  return {
    data,
    error,
  };
};

export const updateInterview = applicantProcedure.input(schema).mutation(query);
