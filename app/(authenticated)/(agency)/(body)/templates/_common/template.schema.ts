import { z } from 'zod';

import { templateInsertSchema, versionInsertSchema } from '@/db/zod';

const templateSchema = templateInsertSchema.pick({
  name: true,
});
const versionSchema = versionInsertSchema.pick({
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
});

export const templateAddSchema = z.object({
  template: templateSchema,
  version: versionSchema,
});
