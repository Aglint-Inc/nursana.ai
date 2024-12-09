import { z } from 'zod';
import { zfd } from 'zod-form-data';

import { nerseTitlesSchema } from '@/db/zod';

export const campaignFormDataSchema = zfd.formData({
  email: z.string().email(),
  role: nerseTitlesSchema,
  first_name: z.string().min(2, 'First name is required'),
  last_name: z.string().optional().nullable(),
  image: z.instanceof(File),
  campaign_id: z.string().uuid(),
  fileExt: z.string(),
  user_id: z.string().uuid().optional().nullable(),
  applicant_id: z.string().uuid().optional().nullable(),
  terms_accepted: z.string(),
  licenses: z.string().nullable(),
});

export const campaignFormDataSchemaWithoutResume = z.object({
  email: z.string().email(),
  role: nerseTitlesSchema,
  first_name: z.string().min(2, 'First name is required'),
  campaign_id: z.string().uuid(),
  user_id: z.string().uuid().optional().nullable(),
  applicant_id: z.string().uuid().optional().nullable(),
  licenses: z.string(),
  current_job_title: z.string().optional().nullable(),
  current_company: z.string().optional().nullable(),
});
