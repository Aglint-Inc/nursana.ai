import { z } from 'zod';

import { supabase } from '@/utils/supabase/client';

import { type ApplicantProcedure, applicantProcedure } from '../../trpc';

const schema = z.object({
  interview_id: z.string(),
  audio_url: z.string().nullable().optional(),
  transcript: z.string().nullable().optional(),
  transcript_json: z
    .array(
      z.object({
        role: z.enum(['ai', 'human']),
        content: z.string(),
      }),
    )
    .nullable()
    .optional(),
  transcript_url: z.string().nullable().optional(),
  updated_at: z.string().nullable().optional(),
  video_url: z.string().nullable().optional(),
});

const query = async ({ input }: ApplicantProcedure<typeof schema>) => {
  const { interview_id, ...rest } = input;
  const { data, error } = await supabase
    .from('interview_analysis')
    .update({
      ...rest,
    })
    .eq('interview_id', interview_id)
    .select()
    .single();

  return {
    data,
    error,
  };
};

export const updateInterviewAnalysis = applicantProcedure
  .input(schema)
  .mutation(query);
