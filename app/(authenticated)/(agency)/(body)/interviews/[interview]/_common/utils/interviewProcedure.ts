import { agencyProcedure, Procedure } from '@/server/api/trpc';
import { interviewRowSchema } from '@/supabase-types/zod-schema.types';

const schema = interviewRowSchema.pick({ id: true });

export const interviewProcedure = agencyProcedure.input(schema);

export type InterviewProcedure<T = unknown> = Procedure<
  typeof interviewProcedure,
  typeof schema & T
>;
