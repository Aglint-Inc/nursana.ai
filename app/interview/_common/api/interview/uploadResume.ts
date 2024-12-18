import { upload } from 'app/campaign/_common/api/campaign-with-resume';
import { schemaInterviewResumeUpload } from 'app/interview/_common/schema/upload';

import { createPublicClient } from '@/db/client';
import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';

const mutation = async ({
  input: { image, campaign_id, fileExt, applicant_id, interview_id },
}: PublicProcedure<typeof schemaInterviewResumeUpload>) => {
  const db = createPublicClient();
  const fileName = `${campaign_id}/${applicant_id}_${Date.now()}.${fileExt}`;
  const resumeUpload = await upload(image, fileName, fileExt);

  const [resume, _int] = await Promise.all([
    await db
      .from('resume')
      .insert({
        applicant_id,
        file_url: resumeUpload.url,
        structured_resume: null,
        campaign_id,
      })
      .select()
      .single()
      .throwOnError(),
    await db
      .from('interview')
      .update({
        interview_stage: 'resume_submitted',
      })
      .eq('id', interview_id),
  ]);

  return resume.data;
};

export const uploadResume = publicProcedure
  .input(schemaInterviewResumeUpload)
  .mutation(mutation);
