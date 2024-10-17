// Generated by ts-to-zod
import { z } from "zod";

export const jsonSchema = z.any();

export const campaignsRowSchema = z.object({
  campaign_code: z.string(),
  created_at: z.string().nullable(),
  description: z.string().nullable(),
  hospital_id: z.string(),
  id: z.string(),
  name: z.string(),
  template_id: z.string(),
  template_version: z.number(),
  updated_at: z.string().nullable(),
});

export const campaignsInsertSchema = z.object({
  campaign_code: z.string(),
  created_at: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  hospital_id: z.string(),
  id: z.string().optional(),
  name: z.string(),
  template_id: z.string(),
  template_version: z.number(),
  updated_at: z.string().optional().nullable(),
});

export const campaignsUpdateSchema = z.object({
  campaign_code: z.string().optional(),
  created_at: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  hospital_id: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  template_id: z.string().optional(),
  template_version: z.number().optional(),
  updated_at: z.string().optional().nullable(),
});

export const campaignsRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal("campaigns_hospital_id_fkey"),
    columns: z.tuple([z.literal("hospital_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("hospitals"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
  z.object({
    foreignKeyName: z.literal("campaigns_template_id_fkey"),
    columns: z.tuple([z.literal("template_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("interview_templates"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
]);

export const eventLogsRowSchema = z.object({
  action: z.string().nullable(),
  created_at: z.string().nullable(),
  entity_id: z.string().nullable(),
  entity_type: z.string().nullable(),
  event_id: z.string(),
});

export const eventLogsInsertSchema = z.object({
  action: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  entity_id: z.string().optional().nullable(),
  entity_type: z.string().optional().nullable(),
  event_id: z.string().optional(),
});

export const eventLogsUpdateSchema = z.object({
  action: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  entity_id: z.string().optional().nullable(),
  entity_type: z.string().optional().nullable(),
  event_id: z.string().optional(),
});

export const eventLogsRelationshipsSchema = z.tuple([]);

export const hospitalsRowSchema = z.object({
  address: z.string().nullable(),
  contact_email: z.string().nullable(),
  contact_number: z.string().nullable(),
  contact_person: z.string().nullable(),
  created_at: z.string().nullable(),
  created_by: z.string().nullable(),
  hospital_name: z.string(),
  id: z.string(),
});

export const hospitalsInsertSchema = z.object({
  address: z.string().optional().nullable(),
  contact_email: z.string().optional().nullable(),
  contact_number: z.string().optional().nullable(),
  contact_person: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  created_by: z.string().optional().nullable(),
  hospital_name: z.string(),
  id: z.string().optional(),
});

export const hospitalsUpdateSchema = z.object({
  address: z.string().optional().nullable(),
  contact_email: z.string().optional().nullable(),
  contact_number: z.string().optional().nullable(),
  contact_person: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  created_by: z.string().optional().nullable(),
  hospital_name: z.string().optional(),
  id: z.string().optional(),
});

export const hospitalsRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal("hospitals_created_by_fkey"),
    columns: z.tuple([z.literal("created_by")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("tenant"),
    referencedColumns: z.tuple([z.literal("user_id")]),
  }),
]);

export const interviewAnalysisRowSchema = z.object({
  audio_url: z.string().nullable(),
  call_analysis: jsonSchema.nullable(),
  call_id: z.string().nullable(),
  created_at: z.string().nullable(),
  duration: z.number().nullable(),
  hospital_id: z.string().nullable(),
  id: z.string(),
  interview_id: z.string(),
  structured_analysis: jsonSchema.nullable(),
  transcript: z.string().nullable(),
  transcript_json: z.array(jsonSchema).nullable(),
  transcript_url: z.string().nullable(),
  updated_at: z.string().nullable(),
  user_id: z.string(),
  video_url: z.string().nullable(),
});

export const interviewAnalysisInsertSchema = z.object({
  audio_url: z.string().optional().nullable(),
  call_analysis: jsonSchema.optional().nullable(),
  call_id: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  duration: z.number().optional().nullable(),
  hospital_id: z.string().optional().nullable(),
  id: z.string().optional(),
  interview_id: z.string(),
  structured_analysis: jsonSchema.optional().nullable(),
  transcript: z.string().optional().nullable(),
  transcript_json: z.array(jsonSchema).optional().nullable(),
  transcript_url: z.string().optional().nullable(),
  updated_at: z.string().optional().nullable(),
  user_id: z.string(),
  video_url: z.string().optional().nullable(),
});

export const interviewAnalysisUpdateSchema = z.object({
  audio_url: z.string().optional().nullable(),
  call_analysis: jsonSchema.optional().nullable(),
  call_id: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  duration: z.number().optional().nullable(),
  hospital_id: z.string().optional().nullable(),
  id: z.string().optional(),
  interview_id: z.string().optional(),
  structured_analysis: jsonSchema.optional().nullable(),
  transcript: z.string().optional().nullable(),
  transcript_json: z.array(jsonSchema).optional().nullable(),
  transcript_url: z.string().optional().nullable(),
  updated_at: z.string().optional().nullable(),
  user_id: z.string().optional(),
  video_url: z.string().optional().nullable(),
});

export const interviewAnalysisRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal("fk_hospital"),
    columns: z.tuple([z.literal("hospital_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("hospitals"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
  z.object({
    foreignKeyName: z.literal("fk_interview"),
    columns: z.tuple([z.literal("interview_id")]),
    isOneToOne: z.literal(true),
    referencedRelation: z.literal("interviews"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
  z.object({
    foreignKeyName: z.literal("interview_analysis_user_id_fkey"),
    columns: z.tuple([z.literal("user_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("users"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
]);

export const interviewTemplatesRowSchema = z.object({
  ai_ending_message: z.string().nullable(),
  ai_instructions: z.array(z.string()).nullable(),
  ai_interview_duration: z.number().nullable(),
  ai_questions: z.string().nullable(),
  ai_welcome_message: z.string().nullable(),
  candidate_estimated_time: z.string().nullable(),
  candidate_instructions: z.array(z.string()).nullable(),
  candidate_intro_video_cover_image_url: z.string().nullable(),
  candidate_intro_video_url: z.string().nullable(),
  candidate_overview: z.array(z.string()).nullable(),
  created_at: z.string().nullable(),
  hospital_id: z.string(),
  id: z.string(),
  name: z.string(),
  published_version: z.number().nullable(),
  status: z.string(),
  updated_at: z.string().nullable(),
  version: z.number(),
});

export const interviewTemplatesInsertSchema = z.object({
  ai_ending_message: z.string().optional().nullable(),
  ai_instructions: z.array(z.string()).optional().nullable(),
  ai_interview_duration: z.number().optional().nullable(),
  ai_questions: z.string().optional().nullable(),
  ai_welcome_message: z.string().optional().nullable(),
  candidate_estimated_time: z.string().optional().nullable(),
  candidate_instructions: z.array(z.string()).optional().nullable(),
  candidate_intro_video_cover_image_url: z.string().optional().nullable(),
  candidate_intro_video_url: z.string().optional().nullable(),
  candidate_overview: z.array(z.string()).optional().nullable(),
  created_at: z.string().optional().nullable(),
  hospital_id: z.string(),
  id: z.string().optional(),
  name: z.string(),
  published_version: z.number().optional().nullable(),
  status: z.string(),
  updated_at: z.string().optional().nullable(),
  version: z.number(),
});

export const interviewTemplatesUpdateSchema = z.object({
  ai_ending_message: z.string().optional().nullable(),
  ai_instructions: z.array(z.string()).optional().nullable(),
  ai_interview_duration: z.number().optional().nullable(),
  ai_questions: z.string().optional().nullable(),
  ai_welcome_message: z.string().optional().nullable(),
  candidate_estimated_time: z.string().optional().nullable(),
  candidate_instructions: z.array(z.string()).optional().nullable(),
  candidate_intro_video_cover_image_url: z.string().optional().nullable(),
  candidate_intro_video_url: z.string().optional().nullable(),
  candidate_overview: z.array(z.string()).optional().nullable(),
  created_at: z.string().optional().nullable(),
  hospital_id: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  published_version: z.number().optional().nullable(),
  status: z.string().optional(),
  updated_at: z.string().optional().nullable(),
  version: z.number().optional(),
});

export const interviewTemplatesRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal("interview_templates_hospital_id_fkey"),
    columns: z.tuple([z.literal("hospital_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("hospitals"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
]);

export const interviewStageSchema = z.union([
  z.literal("not_started"),
  z.literal("resume_submitted"),
  z.literal("interview_inprogress"),
  z.literal("interview_completed"),
]);

export const interviewsInsertSchema = z.object({
  ai_ending_message: z.string().optional().nullable(),
  ai_instructions: z.array(z.string()).optional().nullable(),
  ai_interview_duration: z.number().optional().nullable(),
  ai_questions: z.string().optional().nullable(),
  ai_welcome_message: z.string().optional().nullable(),
  campaign_code: z.string(),
  campaign_id: z.string().optional().nullable(),
  candidate_estimated_time: z.string().optional().nullable(),
  candidate_instructions: z.array(z.string()).optional().nullable(),
  candidate_intro_video_cover_image_url: z.string().optional().nullable(),
  candidate_intro_video_url: z.string().optional().nullable(),
  candidate_overview: z.array(z.string()).optional().nullable(),
  created_at: z.string().optional().nullable(),
  id: z.string().optional(),
  interview_stage: interviewStageSchema.optional(),
  name: z.string(),
  updated_at: z.string().optional().nullable(),
  user_id: z.string(),
});

export const interviewsUpdateSchema = z.object({
  ai_ending_message: z.string().optional().nullable(),
  ai_instructions: z.array(z.string()).optional().nullable(),
  ai_interview_duration: z.number().optional().nullable(),
  ai_questions: z.string().optional().nullable(),
  ai_welcome_message: z.string().optional().nullable(),
  campaign_code: z.string().optional(),
  campaign_id: z.string().optional().nullable(),
  candidate_estimated_time: z.string().optional().nullable(),
  candidate_instructions: z.array(z.string()).optional().nullable(),
  candidate_intro_video_cover_image_url: z.string().optional().nullable(),
  candidate_intro_video_url: z.string().optional().nullable(),
  candidate_overview: z.array(z.string()).optional().nullable(),
  created_at: z.string().optional().nullable(),
  id: z.string().optional(),
  interview_stage: interviewStageSchema.optional(),
  name: z.string().optional(),
  updated_at: z.string().optional().nullable(),
  user_id: z.string().optional(),
});

export const interviewsRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal("interviews_campaign_id_fkey"),
    columns: z.tuple([z.literal("campaign_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("campaigns"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
  z.object({
    foreignKeyName: z.literal("interviews_user_id_fkey"),
    columns: z.tuple([z.literal("user_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("users"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
]);

export const resumesRowSchema = z.object({
  campaign_id: z.string().nullable(),
  created_at: z.string().nullable(),
  error_status: jsonSchema.nullable(),
  file_name: z.string().nullable(),
  file_size: z.string().nullable(),
  file_url: z.string().nullable(),
  id: z.string(),
  structured_resume: jsonSchema.nullable(),
  updated_at: z.string().nullable(),
  user_id: z.string(),
});

export const resumesInsertSchema = z.object({
  campaign_id: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  error_status: jsonSchema.optional().nullable(),
  file_name: z.string().optional().nullable(),
  file_size: z.string().optional().nullable(),
  file_url: z.string().optional().nullable(),
  id: z.string().optional(),
  structured_resume: jsonSchema.optional().nullable(),
  updated_at: z.string().optional().nullable(),
  user_id: z.string(),
});

export const resumesUpdateSchema = z.object({
  campaign_id: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  error_status: jsonSchema.optional().nullable(),
  file_name: z.string().optional().nullable(),
  file_size: z.string().optional().nullable(),
  file_url: z.string().optional().nullable(),
  id: z.string().optional(),
  structured_resume: jsonSchema.optional().nullable(),
  updated_at: z.string().optional().nullable(),
  user_id: z.string().optional(),
});

export const resumesRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal("resumes_campaign_id_fkey"),
    columns: z.tuple([z.literal("campaign_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("campaigns"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
  z.object({
    foreignKeyName: z.literal("resumes_user_id_fkey"),
    columns: z.tuple([z.literal("user_id")]),
    isOneToOne: z.literal(true),
    referencedRelation: z.literal("users"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
]);

export const appRoleSchema = z.union([z.literal("tenant"), z.literal("user")]);

export const rolesInsertSchema = z.object({
  id: z.string().optional(),
  role: appRoleSchema,
  user_id: z.string(),
});

export const rolesUpdateSchema = z.object({
  id: z.string().optional(),
  role: appRoleSchema.optional(),
  user_id: z.string().optional(),
});

export const rolesRelationshipsSchema = z.tuple([]);

export const tenantRowSchema = z.object({
  created_at: z.string(),
  email: z.string(),
  first_name: z.string(),
  hospital_id: z.string().nullable(),
  last_name: z.string().nullable(),
  user_id: z.string(),
});

export const tenantInsertSchema = z.object({
  created_at: z.string().optional(),
  email: z.string(),
  first_name: z.string(),
  hospital_id: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  user_id: z.string(),
});

export const tenantUpdateSchema = z.object({
  created_at: z.string().optional(),
  email: z.string().optional(),
  first_name: z.string().optional(),
  hospital_id: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  user_id: z.string().optional(),
});

export const tenantRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal("tenant_hospital_id_fkey"),
    columns: z.tuple([z.literal("hospital_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("hospitals"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
]);

export const usersRowSchema = z.object({
  created_at: z.string().nullable(),
  email: z.string(),
  expected_salary: z.number().nullable(),
  first_name: z.string().nullable(),
  id: z.string(),
  job_title: z.string().nullable(),
  job_type: z.string().nullable(),
  last_name: z.string().nullable(),
  phone_number: z.string().nullable(),
  preferred_job_titles: z.array(z.string()).nullable(),
  preferred_locations: z.array(z.string()).nullable(),
  profile_status: z.string().nullable(),
  terms_accepted: z.boolean().nullable(),
  travel_preference: z.string().nullable(),
});

export const usersInsertSchema = z.object({
  created_at: z.string().optional().nullable(),
  email: z.string(),
  expected_salary: z.number().optional().nullable(),
  first_name: z.string().optional().nullable(),
  id: z.string(),
  job_title: z.string().optional().nullable(),
  job_type: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  preferred_job_titles: z.array(z.string()).optional().nullable(),
  preferred_locations: z.array(z.string()).optional().nullable(),
  profile_status: z.string().optional().nullable(),
  terms_accepted: z.boolean().optional().nullable(),
  travel_preference: z.string().optional().nullable(),
});

export const usersUpdateSchema = z.object({
  created_at: z.string().optional().nullable(),
  email: z.string().optional(),
  expected_salary: z.number().optional().nullable(),
  first_name: z.string().optional().nullable(),
  id: z.string().optional(),
  job_title: z.string().optional().nullable(),
  job_type: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  preferred_job_titles: z.array(z.string()).optional().nullable(),
  preferred_locations: z.array(z.string()).optional().nullable(),
  profile_status: z.string().optional().nullable(),
  terms_accepted: z.boolean().optional().nullable(),
  travel_preference: z.string().optional().nullable(),
});

export const usersRelationshipsSchema = z.tuple([]);

export const customAccessTokenHookReturnsSchema = jsonSchema;

export const interviewsRowSchema = z.object({
  ai_ending_message: z.string().nullable(),
  ai_instructions: z.array(z.string()).nullable(),
  ai_interview_duration: z.number().nullable(),
  ai_questions: z.string().nullable(),
  ai_welcome_message: z.string().nullable(),
  campaign_code: z.string(),
  campaign_id: z.string().nullable(),
  candidate_estimated_time: z.string().nullable(),
  candidate_instructions: z.array(z.string()).nullable(),
  candidate_intro_video_cover_image_url: z.string().nullable(),
  candidate_intro_video_url: z.string().nullable(),
  candidate_overview: z.array(z.string()).nullable(),
  created_at: z.string().nullable(),
  id: z.string(),
  interview_stage: interviewStageSchema,
  name: z.string(),
  updated_at: z.string().nullable(),
  user_id: z.string(),
});

export const rolesRowSchema = z.object({
  id: z.string(),
  role: appRoleSchema,
  user_id: z.string(),
});
