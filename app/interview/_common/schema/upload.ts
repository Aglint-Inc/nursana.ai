import { z } from 'zod';
import { zfd } from 'zod-form-data';

export const schemaInterviewResumeUpload = zfd.formData({
  image: z.instanceof(File),
  campaign_id: z.string(),
  fileExt: z.string(),
  applicant_id: z.string(),
});
