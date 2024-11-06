import type { transcriptAnalysisSchema } from 'app/api/score_call/type';
import { type z } from 'zod';

import type { TableType } from '.';

export type custom_interview_analysis = TableType<
  'interview_analysis',
  {
    structured_analysis: z.infer<typeof transcriptAnalysisSchema> & {
      overall_score: number;
      parsed?: boolean;
      failed_reason?: 'NO_REPLY' | 'PREMATURELY_CALL_ENDED';
    };
  }
>;
