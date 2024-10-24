import { jobTypesSchema } from '@/supabase-types/zod-schema.types';

export const JOB_TYPES = jobTypesSchema._def.options.map(
  (option) => option.value,
);
