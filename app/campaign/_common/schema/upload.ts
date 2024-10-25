import { z } from 'zod';
import { zfd } from 'zod-form-data';

import { jobTitlesSchema } from '@/supabase-types/zod-schema.types';

export const campaignFormDataSchema = zfd.formData({
  email: z.string().email(),
  role: jobTitlesSchema,
  first_name: z.string().min(2, 'First name is required'),
  last_name: z.string().optional().nullable(),
  image: z.instanceof(File),
  campaign_id: z.string().uuid(),
  fileExt: z.string(),
  user_id: z.string().uuid().optional().nullable(),
  applicant_id: z.string().uuid().optional().nullable(),
  terms_accepted: z.string(),
});
