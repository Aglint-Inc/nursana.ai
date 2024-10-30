import { travelPreferrenceSchema } from '@/db/zod';
export const TRAVEL_PREFERENCES = travelPreferrenceSchema._def.options.map(
  (option) => option.value,
);
