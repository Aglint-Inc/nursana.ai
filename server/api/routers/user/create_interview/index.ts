/* eslint-disable no-console */
import { z } from "zod";

import { type PublicProcedure, publicProcedure } from "@/server/api/trpc";
import { createPublicClient } from "@/server/db";
import { getResumeJson } from "@/utils/resume";

export const schema = z.object({
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string(),
  role: z.string(),
  resume_url: z.string(),
  campaign_code: z.string(),
  userId: z.string(),
});

const mutation = async ({
  input: {
    campaign_code,
    email,
    first_name,
    role,
    last_name,
    resume_url,
    userId,
  },
}: PublicProcedure<typeof schema>) => {
  const db = createPublicClient();
  const campaign = (
    await db
      .from("campaigns")
      .select("*,interview_templates!inner(*)")
      .eq("campaign_code", campaign_code)
      .single()
      .throwOnError()
  ).data;

  if (!campaign) throw new Error("Campaign not found");

  await db
    .from("user_roles")
    .insert({
      user_id: userId,
      role: role as any,
    })
    .throwOnError();

  await db
    .from("users")
    .insert({
      profile_status: "resume_uploaded",
      id: userId,
      email: email,
      first_name: first_name,
      last_name: last_name,
    })
    .throwOnError();

  const { data: updatedResume } = await db
    .from("resumes")
    .insert({
      user_id: userId,
      file_url: resume_url,
      structured_resume: null,
    })
    .select()
    .single()
    .throwOnError();

  if (!updatedResume) throw new Error("Error uploading resume");

  getResumeJson(updatedResume.id, resume_url);

  const { data: interview } = await db
    .from("interviews")
    .insert({
      interview_stage: "resume_submitted",
      name: "Summer 2024 Nurse Recruitment - Interview",
      campaign_code,
      user_id: userId,
      ai_ending_message: campaign.interview_templates.ai_ending_message,
      ai_instructions: campaign.interview_templates.ai_instructions,
      ai_interview_duration: campaign.interview_templates.ai_interview_duration,
      ai_questions: campaign.interview_templates.ai_questions,
      ai_welcome_message: campaign.interview_templates.ai_welcome_message,
      campaign_id: campaign.id,
      candidate_estimated_time:
        campaign.interview_templates.candidate_estimated_time,
      candidate_form: campaign.interview_templates.candidate_form,
      candidate_instructions:
        campaign.interview_templates.candidate_instructions,
      candidate_intro_video_cover_image_url:
        campaign.interview_templates.candidate_intro_video_cover_image_url,
      candidate_intro_video_url:
        campaign.interview_templates.candidate_intro_video_url,
      candidate_overview: campaign.interview_templates.candidate_overview,
    })
    .select()
    .single()
    .throwOnError();

  return interview;
};

export const createInterview = publicProcedure.input(schema).mutation(mutation);
