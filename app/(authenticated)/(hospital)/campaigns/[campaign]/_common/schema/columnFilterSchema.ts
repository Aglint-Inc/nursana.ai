import { z } from 'zod';

import {
  ARRAY_DELIMITER,
  RANGE_DELIMITER,
  SLIDER_DELIMITER,
} from '@/campaign/constants';

export const columnFilterSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  job_title: z.string().optional(),
  interview_stage: z
    .string()
    .transform((val) => val.split(ARRAY_DELIMITER))
    .pipe(
      z
        .enum([
          'not_started',
          'interview_completed',
          'interview_inprogress',
          'resume_submitted',
        ])
        .array(),
    )
    .optional(),
  expected_salary: z
    .string()
    .transform((val) => val.split(SLIDER_DELIMITER))
    .pipe(z.coerce.number().array().max(2))
    .optional(),
  updated_at: z
    .string()
    .transform((val) => val.split(RANGE_DELIMITER).map(Number))
    .pipe(z.coerce.date().array())
    .optional(),
  size: z.number().default(30),
  start: z.number().default(0),
});
