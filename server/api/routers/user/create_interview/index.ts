/* eslint-disable no-console */
import { z } from 'zod';

import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';
import { getResumeJson } from '@/utils/resume';

export const schema = z.object({
  resume_url: z.string(),
  campaign_code: z.string(),
  userId: z.string(),
});

const mutation = async ({
  input: { campaign_code, resume_url, userId },
}: PublicProcedure<typeof schema>) => {
  const db = createPublicClient();
  const campaign = (
    await db
      .from('campaign')
      .select('*,interview_template!inner(*)')
      .eq('campaign_code', campaign_code)
      .single()
      .throwOnError()
  ).data;

  if (!campaign) throw new Error('Campaign not found');

  const [resumeResult, interviewResult] = await Promise.all([
    db
      .from('resume')
      .insert({
        user_id: userId,
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
        user_id: userId,
        ai_ending_message: campaign.interview_template.ai_ending_message,
        ai_instructions: campaign.interview_template.ai_instructions,
        ai_interview_duration:
          campaign.interview_template.ai_interview_duration,
        ai_questions: campaign.interview_template.ai_questions,
        ai_welcome_message: campaign.interview_template.ai_welcome_message,
        campaign_id: campaign.id,
        candidate_estimated_time:
          campaign.interview_template.candidate_estimated_time,
        candidate_instructions:
          campaign.interview_template.candidate_instructions,
        candidate_intro_video_cover_image_url:
          campaign.interview_template.candidate_intro_video_cover_image_url,
        candidate_intro_video_url:
          campaign.interview_template.candidate_intro_video_url,
        candidate_overview: campaign.interview_template.candidate_overview,
        hospital_id: campaign.hospital_id,
        version_id: campaign.version_id,
      })
      .select()
      .single()
      .throwOnError(),
  ]);

  const updatedResume = resumeResult.data;
  if (!updatedResume) throw new Error('Error uploading resume');
  try {
    getResumeJson(updatedResume.id, resume_url);
  } catch {
    //
  }

  const interview = interviewResult.data;
  if (!interview) throw new Error('Error creating interview');

  return interview;
};

export const createInterview = publicProcedure.input(schema).mutation(mutation);
