import 'server-only';

import { z } from 'zod';

import { type AgencyProcedure, agencyProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db/client';
import type { SupabaseClientType } from '@/utils/supabase/supabaseAdmin';

const inputSchema = z.object({
  campaign: z.string().optional(),
  interview: z.string().optional(),
  dateRange: z.object({ startDate: z.date(), endDate: z.date() }).optional(),
});

const query = ({
  ctx: { agency },
  input,
}: AgencyProcedure<typeof inputSchema>) => {
  const { campaign, interview, dateRange } = input;
  // eslint-disable-next-line no-unused-vars
  const { id } = agency;
  const supabase = createPublicClient();
  return getStats(supabase, {
    campaign,
    interview,
    dateRange,
  });
};

export const stats = agencyProcedure.input(inputSchema).query(query);

async function getStats(
  supabase: SupabaseClientType,
  filter: {
    campaign?: string | undefined;
    interview?: string | undefined;
    dateRange?:
      | {
          startDate: Date;
          endDate: Date;
        }
      | undefined;
  },
) {
  const query = supabase
    .from('campaign')
    .select('id,interview(interview_stage, interview_analysis(call_analysis))');
  if (filter.campaign) {
    query.eq('version_id', filter.campaign);
  }
  if (filter.dateRange) {
    query.gte('created_at', filter.dateRange.startDate);
    query.lte('created_at', filter.dateRange.endDate);
  }
  return (await query.throwOnError()).data!;
}
