import 'server-only';

import { type AgencyProcedure, agencyProcedure } from '@/server/api/trpc';
import { z } from 'zod';
import { createPublicClient } from '@/server/db';
import { SupabaseClientType } from '@/utils/supabase/type';
import { transcriptAnalysisSchemaType } from 'app/api/score_call/util';

const inputSchema = z.object({
  campaign: z.string(),
  interview: z.string().optional(),
  dateRange: z
    .object({ startDate: z.string(), endDate: z.string() })
    .optional(),
});

const query = ({
  ctx: { agency },
  input,
}: AgencyProcedure<typeof inputSchema>) => {
  const { campaign, interview, dateRange } = input;
  const { id } = agency;
  const supabase = createPublicClient();
  return getStats(supabase, {
    campaign,
    interview,
    dateRange,
  });
};

export const resumeAnalysis = agencyProcedure.input(inputSchema).query(query);

async function getStats(
  supabase: SupabaseClientType,
  filter: {
    campaign: string;
    interview?: string;
    dateRange?:
      | {
          startDate: string;
          endDate: string;
        }
      | undefined;
  },
) {
  const { data } = await supabase
    .rpc('get_resume_analytics', {
      version_uuid: filter.campaign,
      start_date: filter.dateRange?.startDate,
      end_date: filter.dateRange?.endDate,
    })
    .throwOnError();
  return data! as unknown as get_resume_analytics_type;
}

export type get_resume_analytics_type = {
  total_experience: string;
  licenses: {
    state: string;
    issueDate: null;
    licenseType: string;
    expirationDate: null;
    issuingAuthority: string;
  }[];
  location: {
    city: string;
    state: string;
    country: string;
  };
  x_job_title: string;
  schools: {
    end: { year: number; month: number };
    gpa: number;
    field: string;
    start: { year: number; month: number };
    degree: string;
    institution: string;
  }[];
  skills: string[];
  call_analysis: {
    summary: string;
    overallScore: string;
  };
  resume_analysis: {
    summary: string;
    overallScore: string;
  };
  structured_analysis: transcriptAnalysisSchemaType;
}[];
