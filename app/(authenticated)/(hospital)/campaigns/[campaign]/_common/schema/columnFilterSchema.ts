import { z } from 'zod';

import { ARRAY_DELIMITER, RANGE_DELIMITER } from '@/campaign/constants';

export const inputSchema = z.object({
  id: z.string(),
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

export const columnFilterSchema = z.object({
  email: z.string().optional(),
  interview_stage: z
    .string()
    .transform((val) => val.split(ARRAY_DELIMITER))
    .pipe(inputSchema.shape.interview_stage)
    .optional(),
  updated_at: z
    .string()
    .transform((val) => val.split(RANGE_DELIMITER).map(Number))
    .pipe(inputSchema.shape.updated_at)
    .optional(),
  terms_accepted: z
    .string()
    .transform((val) => val.split(ARRAY_DELIMITER))
    .pipe(inputSchema.shape.terms_accepted)
    .optional(),
});
