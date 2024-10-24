import { z } from 'zod';

import {
  templateInsertSchema,
  versionInsertSchema,
} from '@/supabase-types/zod-schema.types';

const templateSchema = templateInsertSchema.pick({
  name: true,
});
const versionSchema = versionInsertSchema.pick({
  name: true,
});

export const templateAddSchema = z.object({
  template: templateSchema,
  version: versionSchema,
});
