import { interviewRowSchema } from '@/db/zod';
import { agencyProcedure, type Procedure } from '@/server/api/trpc';

const schema = interviewRowSchema.pick({ id: true });

export const interviewProcedure = agencyProcedure.input(schema);

export type InterviewProcedure<T = unknown> = Procedure<
  typeof interviewProcedure,
  typeof schema & T
>;
