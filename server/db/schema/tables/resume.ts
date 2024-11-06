import type {
  resumeJSONSchema,
  resumeReviewSchema,
} from 'app/api/dynamic_resume_score/type';
import type { z } from 'zod';

import type { TableType } from '.';

export type custom_resume = TableType<
  'resume',
  {
    structured_resume: z.infer<typeof resumeJSONSchema>;
    resume_feedback: z.infer<typeof resumeReviewSchema> & {
      overall_score: number;
    };
  }
>;

// export type schemaType = z.infer<typeof resumeSchema>;
