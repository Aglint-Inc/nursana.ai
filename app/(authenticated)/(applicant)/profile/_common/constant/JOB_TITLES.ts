import { nerseTitlesSchema } from '@/supabase-types/zod-schema.types';

export const JOB_TITLES = nerseTitlesSchema._def.options.map(
  (option) => option.value,
);
