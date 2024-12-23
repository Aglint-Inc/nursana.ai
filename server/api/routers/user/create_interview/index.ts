import 'server-only'; /* eslint-disable no-console */

import { z } from 'zod';

import { createPublicClient } from '@/db/client';
import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';

export const schema = z.object({
  resume_url: z.string(),
  campaign_code: z.string(),
  userId: z.string(),
});

const mutation = async ({
  input: { campaign_code, resume_url, userId },
}: PublicProcedure<typeof schema>) => {
  const db = createPublicClient();
  let resume_id = null;
  let interview_id = null;

  try {
    const campaign = (
      await db
        .from('campaign')
        .select('*,version!inner(*)')
        .eq('campaign_code', campaign_code)
        .single()
        .throwOnError()
    ).data;

    if (!campaign) throw new Error('Campaign not found');

    const [resumeResult, interviewResult] = await Promise.all([
      db
        .from('resume')
        .insert({
          applicant_id: userId,
          file_url: resume_url,
          structured_resume: null,
          campaign_id: campaign.id,
        })
        .select()
        .single()
        .throwOnError(),

      db
        .from('interview')
        .insert({
          interview_stage: 'resume_submitted',
          name: campaign.name,
          applicant_id: userId,
          campaign_id: campaign.id,
          agency_id: campaign.agency_id,
          version_id: campaign.version_id,
          ai_ending_message: campaign.version.ai_ending_message,
          ai_instructions: [campaign.version.ai_instructions ?? ''],
          ai_interview_duration: campaign.version.ai_interview_duration,
          ai_questions: campaign.version.ai_questions,
          ai_welcome_message: campaign.version.ai_welcome_message,
          candidate_estimated_time: campaign.version.candidate_estimated_time,
          candidate_instructions: [
            campaign.version.candidate_instructions ?? '',
          ],
          candidate_intro_video_cover_image_url:
            campaign.version.candidate_intro_video_cover_image_url,
          candidate_intro_video_url: campaign.version.candidate_intro_video_url,
          candidate_overview: [campaign.version.candidate_overview ?? ''],
        })
        .select('*,version!inner(*)')
        .single()
        .throwOnError(),
    ]);

    const updatedResume = resumeResult.data;

    if (!updatedResume) throw new Error('Error uploading resume');
    resume_id = resumeResult.data.id;

    const interview = interviewResult.data;
    if (!interview) throw new Error('Error creating interview');
    interview_id = interview.id;
    return interview;
  } catch (e) {
    if (resume_id) {
      await db.from('resume').delete().eq('id', resume_id);
    }
    if (interview_id) {
      await db.from('interview').delete().eq('id', interview_id);
    }
    throw e;
  }
};

export const createInterview = publicProcedure.input(schema).mutation(mutation);
