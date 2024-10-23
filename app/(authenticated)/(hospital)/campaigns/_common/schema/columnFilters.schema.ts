import { z } from 'zod';

import {
  ARRAY_DELIMITER,
  RANGE_DELIMITER,
} from '@/campaigns/constants/delimiters';

import { schema as interviewsSchema } from './interviews.schema';

export const schema = z.object({
  email: z.string().optional(),
  interview_stage: z
    .string()
    .transform((val) => val.split(ARRAY_DELIMITER))
    .pipe(interviewsSchema.shape.interview_stage)
    .optional(),
  updated_at: z
    .string()
    .transform((val) => val.split(RANGE_DELIMITER).map(Number))
    .pipe(interviewsSchema.shape.updated_at)
    .optional(),
  terms_accepted: z
    .string()
    .transform((val) => val.split(ARRAY_DELIMITER))
    .pipe(interviewsSchema.shape.terms_accepted)
    .optional(),
});
