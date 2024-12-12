import 'server-only';

import { z } from 'zod';

import { supabase } from '@/utils/supabase/client';

import {
  type ApplicantProcedure,
  applicantProcedure,
} from '../../../../../server/api/trpc';

const schema = z.object({
  date: z.string(),
  interview_id: z.string().uuid(),
});

const mutation = async ({ input }: ApplicantProcedure<typeof schema>) => {
  const { date, interview_id } = input;
  const { data } = await supabase
    .from('interview_scheduled')
    .upsert({
      scheduled_at: date,
      interview_id,
    })
    .throwOnError();

  return {
    data,
  };
};

export const scheduleInterview = applicantProcedure
  .input(schema)
  .mutation(mutation);
