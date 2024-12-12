import { upload } from 'app/campaign/_common/api/campaign-with-resume';
import { schemaInterviewResumeUpload } from 'app/interview/_common/schema/upload';

import { createPublicClient } from '@/db/client';
import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';

const mutation = async ({
  input: { image, campaign_id, fileExt, applicant_id },
}: PublicProcedure<typeof schemaInterviewResumeUpload>) => {
  const db = createPublicClient();
  const fileName = `${campaign_id}/${applicant_id}_${Date.now()}.${fileExt}`;
  const resumeUpload = await upload(image, fileName, fileExt);

  const { data } = await db
    .from('resume')
    .insert({
      applicant_id,
      file_url: resumeUpload.url,
      structured_resume: null,
      campaign_id,
    })
    .select()
    .single()
    .throwOnError();

  return data;
};

export const uploadResume = publicProcedure
  .input(schemaInterviewResumeUpload)
  .mutation(mutation);
