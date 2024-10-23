import 'server-only';

import {
  type HospitalProcedure,
  hospitalProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';
import {
  versionRowSchema,
  versionUpdateSchema,
} from '@/supabase-types/zod-schema.types';

const schema = versionRowSchema.pick({ id: true }).merge(
  versionUpdateSchema.pick({
    name: true,
    ai_ending_message: true,
    ai_instructions: true,
    ai_interview_duration: true,
    ai_questions: true,
    ai_welcome_message: true,
    candidate_estimated_time: true,
    candidate_instructions: true,
    candidate_overview: true,
  }),
);

const mutation = async ({ ctx, input }: HospitalProcedure<typeof schema>) => {
  const db = createPrivateClient();
  return (
    await db
      .from('version')
      .update(input)
      .eq('id', input.id)
      .eq('hospital_id', ctx.hospital.id)
      .single()
      .throwOnError()
  ).data;
};

export const edit = hospitalProcedure.input(schema).mutation(mutation);

export type Edit = ProcedureDefinition<typeof edit>;
