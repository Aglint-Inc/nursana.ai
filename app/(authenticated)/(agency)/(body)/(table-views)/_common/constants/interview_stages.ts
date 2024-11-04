import type { DBEnums } from '@/server/db/types';

export const INTERVIEW_STAGES: DBEnums<'interview_stage'>[] = [
  'not_started',
  'interview_completed',
  'interview_inprogress',
  'resume_submitted',
] as const;
