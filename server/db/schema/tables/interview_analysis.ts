import type { transcriptAnalysisSchema } from 'app/api/score_call/type';
import { type ResponseSchemaVideoAnalysis } from 'app/api/video-analysis/response-schema';
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
    video_analysis: ResponseSchemaVideoAnalysis;
  }
>;
