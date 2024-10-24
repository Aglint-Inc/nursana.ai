import { jobTitlesSchema } from '@/supabase-types/zod-schema.types';

export const JOB_TITLES = jobTitlesSchema._def.options.map(
  (option) => option.value,
);
