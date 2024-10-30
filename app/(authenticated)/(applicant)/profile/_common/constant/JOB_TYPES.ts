import { jobTypesSchema } from '@/db/zod';

export const JOB_TYPES = jobTypesSchema._def.options.map(
  (option) => option.value,
);
