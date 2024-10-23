import { z } from 'zod';

export const schema = z.object({
  interview_stage: z
    .enum([
      'not_started',
      'interview_completed',
      'interview_inprogress',
      'resume_submitted',
    ])
    .array()
    .optional(),
  updated_at: z.coerce.date().array().max(2).optional(),
  terms_accepted: z.array(z.boolean()).optional(),
});
