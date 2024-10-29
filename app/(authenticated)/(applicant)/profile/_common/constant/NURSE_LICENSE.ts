import { nurseLicenseSchema } from '@/supabase-types/zod-schema.types';

export const NURSE_LICENSE = nurseLicenseSchema._def.options.map(
  (option) => option.value,
);
