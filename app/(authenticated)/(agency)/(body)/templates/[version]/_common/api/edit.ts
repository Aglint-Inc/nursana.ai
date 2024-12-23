import 'server-only';

import { createPrivateClient } from '@/db/client';
import { versionRowSchema, versionUpdateSchema } from '@/db/zod';
import {
  type AgencyProcedure,
  agencyProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

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
    candidate_intro_video_url: true,
    candidate_intro_video_cover_image_url: true,
  }),
);

const mutation = async ({ ctx, input }: AgencyProcedure<typeof schema>) => {
  const db = createPrivateClient();
  return (
    await db
      .from('version')
      .update(input)
      .eq('id', input.id)
      .eq('agency_id', ctx.agency.id)
      .single()
      .throwOnError()
  ).data;
};

export const edit = agencyProcedure.input(schema).mutation(mutation);

export type Edit = ProcedureDefinition<typeof edit>;
