import { travelPreferrenceSchema } from '@/supabase-types/zod-schema.types';
export const TRAVEL_PREFERENCES = travelPreferrenceSchema._def.options.map(
  (option) => option.value,
);
