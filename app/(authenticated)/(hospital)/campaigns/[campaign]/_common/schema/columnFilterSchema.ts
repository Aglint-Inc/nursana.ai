import { z } from 'zod';

import {
  ARRAY_DELIMITER,
  RANGE_DELIMITER,
  //   SLIDER_DELIMITER,
} from '@/campaign/constants';

export const inputSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().optional(),
  job_title: z.string().optional(),
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
  terms_accepted: z.boolean().optional(),
  pageSize: z.number().default(10),
  pageIndex: z.number().default(0),
});

export const columnFilterSchema = inputSchema
  .pick({
    name: true,
    email: true,
    job_title: true,
    pageSize: true,
    pageIndex: true,
  })
  .merge(
    z.object({
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
    }),
  );

//   expected_salary: z
//     .string()
//     .transform((val) => val.split(SLIDER_DELIMITER))
//     .pipe(z.coerce.number().array().max(2))
//     .optional(),
