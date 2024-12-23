// Generated by ts-to-zod
import { z } from "zod";

export const jsonSchema = z.record(
  z.union([z.string(), z.number()]),
  z.unknown(),
);

export const agencyRowSchema = z.object({
  address: z.string().nullable(),
  contact_email: z.string().nullable(),
  contact_number: z.string().nullable(),
  created_at: z.string().nullable(),
  id: z.string(),
  name: z.string(),
});

export const agencyInsertSchema = z.object({
  address: z.string().optional().nullable(),
  contact_email: z.string().optional().nullable(),
  contact_number: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  id: z.string().optional(),
  name: z.string(),
});

export const agencyUpdateSchema = z.object({
  address: z.string().optional().nullable(),
  contact_email: z.string().optional().nullable(),
  contact_number: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  id: z.string().optional(),
  name: z.string().optional(),
});

export const agencyRelationshipsSchema = z.tuple([]);

export const agencyUserRowSchema = z.object({
  agency_id: z.string(),
  id: z.string(),
});

export const agencyUserInsertSchema = z.object({
  agency_id: z.string(),
  id: z.string(),
});

export const agencyUserUpdateSchema = z.object({
  agency_id: z.string().optional(),
  id: z.string().optional(),
});

export const agencyUserRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal("agency_user_agency_id_fkey"),
    columns: z.tuple([z.literal("agency_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("agency"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
  z.object({
    foreignKeyName: z.literal("agency_user_id_fkey"),
    columns: z.tuple([z.literal("id")]),
    isOneToOne: z.literal(true),
    referencedRelation: z.literal("user"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
]);

export const nerseTitlesSchema = z.union([
  z.literal("registered-nurse"),
  z.literal("licensed-practical-nurse"),
  z.literal("nurse-practitioner"),
  z.literal("certified-registered-nurse-anesthetist"),
  z.literal("certified-nurse-midwife"),
  z.literal("clinical-nurse-specialist"),
  z.literal("cardiac-nurse"),
  z.literal("oncology-nurse"),
  z.literal("pediatric-nurse"),
  z.literal("geriatric-nurse"),
  z.literal("orthopedic-nurse"),
  z.literal("neonatal-nurse"),
  z.literal("perioperative-operating-room-nurse"),
  z.literal("emergency-trauma-nurse"),
  z.literal("critical-care-icu-nurse"),
  z.literal("psychiatric-mental-health-nurse"),
  z.literal("rehabilitation-nurse"),
  z.literal("infection-control-nurse"),
  z.literal("public-health-nurse"),
  z.literal("community-health-nurse"),
  z.literal("home-health-nurse"),
  z.literal("school-nurse"),
  z.literal("nurse-educator"),
  z.literal("nurse-researcher"),
  z.literal("nurse-informaticist"),
  z.literal("nurse-administrator-nurse-executive"),
  z.literal("nurse-case-manager"),
  z.literal("nurse-consultant"),
  z.literal("quality-improvement-nurse"),
  z.literal("forensic-nurse"),
  z.literal("holistic-nurse"),
  z.literal("telehealth-nurse"),
  z.literal("flight-transport-nurse"),
  z.literal("military-nurse"),
  z.literal("occupational-health-nurse"),
  z.literal("hospice-palliative-care-nurse"),
]);

export const travelPreferrenceSchema = z.union([
  z.literal("no-travel"),
  z.literal("occasional-travel"),
  z.literal("frequent-travel"),
  z.literal("up-to-50-travel"),
  z.literal("up-to-75-travel"),
  z.literal("100-travel"),
]);

export const applicantUserRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal("applicant_user_id_fkey"),
    columns: z.tuple([z.literal("id")]),
    isOneToOne: z.literal(true),
    referencedRelation: z.literal("user"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
]);

export const campaignStatusSchema = z.union([
  z.literal("archived"),
  z.literal("active"),
]);

export const campaignInsertSchema = z.object({
  agency_id: z.string(),
  campaign_code: z.string(),
  created_at: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  id: z.string().optional(),
  name: z.string(),
  status: campaignStatusSchema.optional(),
  updated_at: z.string().optional().nullable(),
  version_id: z.string(),
});

export const campaignUpdateSchema = z.object({
  agency_id: z.string().optional(),
  campaign_code: z.string().optional(),
  created_at: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  id: z.string().optional(),
  name: z.string().optional(),
  status: campaignStatusSchema.optional(),
  updated_at: z.string().optional().nullable(),
  version_id: z.string().optional(),
});

export const campaignRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal("campaign_agency_id_fkey"),
    columns: z.tuple([z.literal("agency_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("agency"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
  z.object({
    foreignKeyName: z.literal("campaign_version_id_fkey"),
    columns: z.tuple([z.literal("version_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("version"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
]);

export const envRowSchema = z.object({
  created_at: z.string(),
  key: z.string(),
  value: z.string(),
});

export const envInsertSchema = z.object({
  created_at: z.string().optional(),
  key: z.string(),
  value: z.string(),
});

export const envUpdateSchema = z.object({
  created_at: z.string().optional(),
  key: z.string().optional(),
  value: z.string().optional(),
});

export const envRelationshipsSchema = z.tuple([]);

export const interviewStageSchema = z.union([
  z.literal("not_started"),
  z.literal("resume_submitted"),
  z.literal("interview_inprogress"),
  z.literal("interview_completed"),
]);

export const interviewInsertSchema = z.object({
  agency_id: z.string(),
  ai_ending_message: z.string().optional().nullable(),
  ai_instructions: z.array(z.string()).optional().nullable(),
  ai_interview_duration: z.number().optional(),
  ai_questions: z.string().optional().nullable(),
  ai_welcome_message: z.string().optional().nullable(),
  applicant_id: z.string(),
  campaign_id: z.string(),
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
  version_id: z.string(),
});

export const interviewUpdateSchema = z.object({
  agency_id: z.string().optional(),
  ai_ending_message: z.string().optional().nullable(),
  ai_instructions: z.array(z.string()).optional().nullable(),
  ai_interview_duration: z.number().optional(),
  ai_questions: z.string().optional().nullable(),
  ai_welcome_message: z.string().optional().nullable(),
  applicant_id: z.string().optional(),
  campaign_id: z.string().optional(),
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
  version_id: z.string().optional(),
});

export const interviewRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal("interview_agency_id_fkey"),
    columns: z.tuple([z.literal("agency_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("agency"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
  z.object({
    foreignKeyName: z.literal("interview_applicant_id_fkey"),
    columns: z.tuple([z.literal("applicant_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("applicant_user"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
  z.object({
    foreignKeyName: z.literal("interview_campaign_id_fkey"),
    columns: z.tuple([z.literal("campaign_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("campaign"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
  z.object({
    foreignKeyName: z.literal("interview_version_id_fkey"),
    columns: z.tuple([z.literal("version_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("version"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
]);

export const interviewAnalysisRowSchema = z.object({
  analysis_status: jsonSchema.nullable(),
  applicant_id: z.string(),
  audio_url: z.string().nullable(),
  call_analysis: jsonSchema.nullable(),
  call_id: z.string().nullable(),
  created_at: z.string().nullable(),
  google_storage_uri: z.string().nullable(),
  id: z.string(),
  interview_id: z.string(),
  structured_analysis: jsonSchema.nullable(),
  transcript: z.string().nullable(),
  transcript_json: z.array(jsonSchema).nullable(),
  transcript_url: z.string().nullable(),
  updated_at: z.string().nullable(),
  video_analysis: jsonSchema.nullable(),
  video_url: z.string().nullable(),
});

export const interviewAnalysisInsertSchema = z.object({
  analysis_status: jsonSchema.optional().nullable(),
  applicant_id: z.string(),
  audio_url: z.string().optional().nullable(),
  call_analysis: jsonSchema.optional().nullable(),
  call_id: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  google_storage_uri: z.string().optional().nullable(),
  id: z.string().optional(),
  interview_id: z.string(),
  structured_analysis: jsonSchema.optional().nullable(),
  transcript: z.string().optional().nullable(),
  transcript_json: z.array(jsonSchema).optional().nullable(),
  transcript_url: z.string().optional().nullable(),
  updated_at: z.string().optional().nullable(),
  video_analysis: jsonSchema.optional().nullable(),
  video_url: z.string().optional().nullable(),
});

export const interviewAnalysisUpdateSchema = z.object({
  analysis_status: jsonSchema.optional().nullable(),
  applicant_id: z.string().optional(),
  audio_url: z.string().optional().nullable(),
  call_analysis: jsonSchema.optional().nullable(),
  call_id: z.string().optional().nullable(),
  created_at: z.string().optional().nullable(),
  google_storage_uri: z.string().optional().nullable(),
  id: z.string().optional(),
  interview_id: z.string().optional(),
  structured_analysis: jsonSchema.optional().nullable(),
  transcript: z.string().optional().nullable(),
  transcript_json: z.array(jsonSchema).optional().nullable(),
  transcript_url: z.string().optional().nullable(),
  updated_at: z.string().optional().nullable(),
  video_analysis: jsonSchema.optional().nullable(),
  video_url: z.string().optional().nullable(),
});

export const interviewAnalysisRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal("interview_analysis_applicant_id_fkey"),
    columns: z.tuple([z.literal("applicant_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("applicant_user"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
  z.object({
    foreignKeyName: z.literal("interview_analysis_interview_id_fkey"),
    columns: z.tuple([z.literal("interview_id")]),
    isOneToOne: z.literal(true),
    referencedRelation: z.literal("interview"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
]);

export const interviewScheduledRowSchema = z.object({
  created_at: z.string(),
  interview_id: z.string(),
  scheduled_at: z.string().nullable(),
});

export const interviewScheduledInsertSchema = z.object({
  created_at: z.string().optional(),
  interview_id: z.string(),
  scheduled_at: z.string().optional().nullable(),
});

export const interviewScheduledUpdateSchema = z.object({
  created_at: z.string().optional(),
  interview_id: z.string().optional(),
  scheduled_at: z.string().optional().nullable(),
});

export const interviewScheduledRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal("interview_scheduled_interview_id_fkey"),
    columns: z.tuple([z.literal("interview_id")]),
    isOneToOne: z.literal(true),
    referencedRelation: z.literal("interview"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
]);

export const locationsListRowSchema = z.object({
  city: z.string(),
  country: z.string(),
  level: z.string(),
  place_id: z.string(),
  state: z.string(),
});

export const locationsListInsertSchema = z.object({
  city: z.string(),
  country: z.string(),
  level: z.string(),
  place_id: z.string(),
  state: z.string(),
});

export const locationsListUpdateSchema = z.object({
  city: z.string().optional(),
  country: z.string().optional(),
  level: z.string().optional(),
  place_id: z.string().optional(),
  state: z.string().optional(),
});

export const locationsListRelationshipsSchema = z.tuple([]);

export const preferredJobTitlesRowSchema = z.object({
  applicant_id: z.string(),
  id: z.string(),
  job_titles: nerseTitlesSchema,
});

export const preferredJobTitlesInsertSchema = z.object({
  applicant_id: z.string().optional(),
  id: z.string().optional(),
  job_titles: nerseTitlesSchema.optional(),
});

export const preferredJobTitlesUpdateSchema = z.object({
  applicant_id: z.string().optional(),
  id: z.string().optional(),
  job_titles: nerseTitlesSchema.optional(),
});

export const preferredJobTitlesRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal("preferred_job_title_applicant_id_fkey"),
    columns: z.tuple([z.literal("applicant_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("applicant_user"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
]);

export const jobTypesSchema = z.union([
  z.literal("full-time"),
  z.literal("part-time"),
  z.literal("contract"),
  z.literal("internship"),
]);

export const preferredJobTypesInsertSchema = z.object({
  applicant_id: z.string(),
  id: z.string().optional(),
  job_type: jobTypesSchema.optional().nullable(),
});

export const preferredJobTypesUpdateSchema = z.object({
  applicant_id: z.string().optional(),
  id: z.string().optional(),
  job_type: jobTypesSchema.optional().nullable(),
});

export const preferredJobTypesRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal("preferred_job_type_applicant_id_fkey"),
    columns: z.tuple([z.literal("applicant_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("applicant_user"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
]);

export const preferredLocationsRowSchema = z.object({
  applicant_id: z.string(),
  id: z.string(),
  place_id: z.string(),
});

export const preferredLocationsInsertSchema = z.object({
  applicant_id: z.string(),
  id: z.string().optional(),
  place_id: z.string(),
});

export const preferredLocationsUpdateSchema = z.object({
  applicant_id: z.string().optional(),
  id: z.string().optional(),
  place_id: z.string().optional(),
});

export const preferredLocationsRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal("preferred_location_applicant_id_fkey"),
    columns: z.tuple([z.literal("applicant_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("applicant_user"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
  z.object({
    foreignKeyName: z.literal("preferred_locations_place_id_fkey"),
    columns: z.tuple([z.literal("place_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("locations_list"),
    referencedColumns: z.tuple([z.literal("place_id")]),
  }),
]);

export const resumeRowSchema = z.object({
  applicant_id: z.string(),
  campaign_id: z.string(),
  created_at: z.string().nullable(),
  error_status: jsonSchema.nullable(),
  file_url: z.string(),
  id: z.string(),
  processing_status: jsonSchema.nullable(),
  resume_feedback: jsonSchema.nullable(),
  structured_resume: jsonSchema.nullable(),
  updated_at: z.string().nullable(),
});

export const resumeInsertSchema = z.object({
  applicant_id: z.string(),
  campaign_id: z.string(),
  created_at: z.string().optional().nullable(),
  error_status: jsonSchema.optional().nullable(),
  file_url: z.string(),
  id: z.string().optional(),
  processing_status: jsonSchema.optional().nullable(),
  resume_feedback: jsonSchema.optional().nullable(),
  structured_resume: jsonSchema.optional().nullable(),
  updated_at: z.string().optional().nullable(),
});

export const resumeUpdateSchema = z.object({
  applicant_id: z.string().optional(),
  campaign_id: z.string().optional(),
  created_at: z.string().optional().nullable(),
  error_status: jsonSchema.optional().nullable(),
  file_url: z.string().optional(),
  id: z.string().optional(),
  processing_status: jsonSchema.optional().nullable(),
  resume_feedback: jsonSchema.optional().nullable(),
  structured_resume: jsonSchema.optional().nullable(),
  updated_at: z.string().optional().nullable(),
});

export const resumeRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal("resume_applicant_id_fkey"),
    columns: z.tuple([z.literal("applicant_id")]),
    isOneToOne: z.literal(true),
    referencedRelation: z.literal("applicant_user"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
  z.object({
    foreignKeyName: z.literal("resume_campaign_id_fkey"),
    columns: z.tuple([z.literal("campaign_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("campaign"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
]);

export const templateRowSchema = z.object({
  agency_id: z.string(),
  created_at: z.string(),
  id: z.string(),
  name: z.string(),
});

export const templateInsertSchema = z.object({
  agency_id: z.string(),
  created_at: z.string().optional(),
  id: z.string().optional(),
  name: z.string(),
});

export const templateUpdateSchema = z.object({
  agency_id: z.string().optional(),
  created_at: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
});

export const templateRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal("template_agency_id_fkey"),
    columns: z.tuple([z.literal("agency_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("agency"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
]);

export const userRoleSchema = z.union([
  z.literal("applicant_user"),
  z.literal("agency_user"),
]);

export const userInsertSchema = z.object({
  created_at: z.string().optional(),
  email: z.string(),
  first_name: z.string(),
  id: z.string(),
  last_name: z.string().optional(),
  user_role: userRoleSchema.optional(),
});

export const userUpdateSchema = z.object({
  created_at: z.string().optional(),
  email: z.string().optional(),
  first_name: z.string().optional(),
  id: z.string().optional(),
  last_name: z.string().optional(),
  user_role: userRoleSchema.optional(),
});

export const userRelationshipsSchema = z.tuple([]);

export const userInterviewRatingRowSchema = z.object({
  applicant_id: z.string(),
  created_at: z.string(),
  feedback: z.string(),
  id: z.string(),
  rating: z.number(),
});

export const userInterviewRatingInsertSchema = z.object({
  applicant_id: z.string().optional(),
  created_at: z.string().optional(),
  feedback: z.string().optional(),
  id: z.string().optional(),
  rating: z.number(),
});

export const userInterviewRatingUpdateSchema = z.object({
  applicant_id: z.string().optional(),
  created_at: z.string().optional(),
  feedback: z.string().optional(),
  id: z.string().optional(),
  rating: z.number().optional(),
});

export const userInterviewRatingRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal("user_interview_rating_applicant_id_fkey"),
    columns: z.tuple([z.literal("applicant_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("applicant_user"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
]);

export const versionStatusSchema = z.union([
  z.literal("archived"),
  z.literal("active"),
]);

export const versionInsertSchema = z.object({
  agency_id: z.string(),
  ai_ending_message: z.string().optional().nullable(),
  ai_instructions: z.string().optional(),
  ai_interview_duration: z.number().optional(),
  ai_questions: z.string().optional().nullable(),
  ai_welcome_message: z.string().optional().nullable(),
  candidate_estimated_time: z.string().optional().nullable(),
  candidate_instructions: z.string().optional(),
  candidate_intro_video_cover_image_url: z.string().optional().nullable(),
  candidate_intro_video_url: z.string().optional().nullable(),
  candidate_overview: z.string().optional(),
  created_at: z.string().optional(),
  id: z.string().optional(),
  name: z.string(),
  status: versionStatusSchema.optional(),
  template_id: z.string(),
  updated_at: z.string().optional(),
});

export const versionUpdateSchema = z.object({
  agency_id: z.string().optional(),
  ai_ending_message: z.string().optional().nullable(),
  ai_instructions: z.string().optional(),
  ai_interview_duration: z.number().optional(),
  ai_questions: z.string().optional().nullable(),
  ai_welcome_message: z.string().optional().nullable(),
  candidate_estimated_time: z.string().optional().nullable(),
  candidate_instructions: z.string().optional(),
  candidate_intro_video_cover_image_url: z.string().optional().nullable(),
  candidate_intro_video_url: z.string().optional().nullable(),
  candidate_overview: z.string().optional(),
  created_at: z.string().optional(),
  id: z.string().optional(),
  name: z.string().optional(),
  status: versionStatusSchema.optional(),
  template_id: z.string().optional(),
  updated_at: z.string().optional(),
});

export const versionRelationshipsSchema = z.tuple([
  z.object({
    foreignKeyName: z.literal("version_agency_id_fkey"),
    columns: z.tuple([z.literal("agency_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("agency"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
  z.object({
    foreignKeyName: z.literal("version_template_id_fkey"),
    columns: z.tuple([z.literal("template_id")]),
    isOneToOne: z.literal(false),
    referencedRelation: z.literal("template"),
    referencedColumns: z.tuple([z.literal("id")]),
  }),
]);

export const customAccessTokenHookReturnsSchema = jsonSchema;

export const nurseLicenseSchema = z.union([
  z.literal("registered-nurse"),
  z.literal("nurse-practitioner"),
  z.literal("licensed-practical-nurse"),
  z.literal("clinical-nurse-specialist"),
  z.literal("certified-nurse-midwife"),
  z.literal("advanced-practice-registered-nurse"),
  z.literal("certified-registered-nurse-anesthetist"),
  z.literal("public-health-nurse"),
  z.literal("registered-nurse-board-certified"),
  z.literal("certified-nursing-assistant"),
  z.literal("home-health-aide"),
  z.literal("acute-care-nurse-practitioner"),
  z.literal("family-nurse-practitioner"),
  z.literal("pediatric-nurse-practitioner"),
  z.literal("adult-gerontology-nurse-practitioner"),
  z.literal("psychiatric-mental-health-nurse-practitioner"),
  z.literal("travel-nurse-license-compact-license"),
]);

export const applicantUserRowSchema = z.object({
  certification_agency: z.array(z.string()).nullable(),
  created_at: z.string().nullable(),
  current_company: z.string().nullable(),
  current_job_title: z.string().nullable(),
  education_level: z.string().nullable(),
  employment_interest: z.string().nullable(),
  id: z.string(),
  income_level: z.string().nullable(),
  job_title: nerseTitlesSchema,
  licence_number: z.string().nullable(),
  licenced_year: z.string().nullable(),
  licensed_state: z.string().nullable(),
  licenses: z.array(nurseLicenseSchema).nullable(),
  malpractice_insurance: z.boolean().nullable(),
  memberships: z.array(z.string()),
  npi_number: z.string().nullable(),
  open_to_work: z.boolean(),
  patients_attend_per_week: z.number().nullable(),
  phone_number: z.string().nullable(),
  preceptorship_interest: z.boolean().nullable(),
  preferred_travel_preference: travelPreferrenceSchema.nullable(),
  professional_highlight: z.string().nullable(),
  proffessional_titles: z.string().nullable(),
  salary_range: z.unknown().nullable(),
  specialties: z.array(z.string()),
  terms_accepted: z.boolean(),
  virtues: z.string().nullable(),
});

export const applicantUserInsertSchema = z.object({
  certification_agency: z.array(z.string()).optional().nullable(),
  created_at: z.string().optional().nullable(),
  current_company: z.string().optional().nullable(),
  current_job_title: z.string().optional().nullable(),
  education_level: z.string().optional().nullable(),
  employment_interest: z.string().optional().nullable(),
  id: z.string(),
  income_level: z.string().optional().nullable(),
  job_title: nerseTitlesSchema.optional(),
  licence_number: z.string().optional().nullable(),
  licenced_year: z.string().optional().nullable(),
  licensed_state: z.string().optional().nullable(),
  licenses: z.array(nurseLicenseSchema).optional().nullable(),
  malpractice_insurance: z.boolean().optional().nullable(),
  memberships: z.array(z.string()).optional(),
  npi_number: z.string().optional().nullable(),
  open_to_work: z.boolean().optional(),
  patients_attend_per_week: z.number().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  preceptorship_interest: z.boolean().optional().nullable(),
  preferred_travel_preference: travelPreferrenceSchema.optional().nullable(),
  professional_highlight: z.string().optional().nullable(),
  proffessional_titles: z.string().optional().nullable(),
  salary_range: z.unknown().optional().nullable(),
  specialties: z.array(z.string()).optional(),
  terms_accepted: z.boolean().optional(),
  virtues: z.string().optional().nullable(),
});

export const applicantUserUpdateSchema = z.object({
  certification_agency: z.array(z.string()).optional().nullable(),
  created_at: z.string().optional().nullable(),
  current_company: z.string().optional().nullable(),
  current_job_title: z.string().optional().nullable(),
  education_level: z.string().optional().nullable(),
  employment_interest: z.string().optional().nullable(),
  id: z.string().optional(),
  income_level: z.string().optional().nullable(),
  job_title: nerseTitlesSchema.optional(),
  licence_number: z.string().optional().nullable(),
  licenced_year: z.string().optional().nullable(),
  licensed_state: z.string().optional().nullable(),
  licenses: z.array(nurseLicenseSchema).optional().nullable(),
  malpractice_insurance: z.boolean().optional().nullable(),
  memberships: z.array(z.string()).optional(),
  npi_number: z.string().optional().nullable(),
  open_to_work: z.boolean().optional(),
  patients_attend_per_week: z.number().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  preceptorship_interest: z.boolean().optional().nullable(),
  preferred_travel_preference: travelPreferrenceSchema.optional().nullable(),
  professional_highlight: z.string().optional().nullable(),
  proffessional_titles: z.string().optional().nullable(),
  salary_range: z.unknown().optional().nullable(),
  specialties: z.array(z.string()).optional(),
  terms_accepted: z.boolean().optional(),
  virtues: z.string().optional().nullable(),
});

export const campaignRowSchema = z.object({
  agency_id: z.string(),
  campaign_code: z.string(),
  created_at: z.string().nullable(),
  description: z.string().nullable(),
  id: z.string(),
  name: z.string(),
  status: campaignStatusSchema,
  updated_at: z.string().nullable(),
  version_id: z.string(),
});

export const interviewRowSchema = z.object({
  agency_id: z.string(),
  ai_ending_message: z.string().nullable(),
  ai_instructions: z.array(z.string()).nullable(),
  ai_interview_duration: z.number(),
  ai_questions: z.string().nullable(),
  ai_welcome_message: z.string().nullable(),
  applicant_id: z.string(),
  campaign_id: z.string(),
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
  version_id: z.string(),
});

export const preferredJobTypesRowSchema = z.object({
  applicant_id: z.string(),
  id: z.string(),
  job_type: jobTypesSchema.nullable(),
});

export const userRowSchema = z.object({
  created_at: z.string(),
  email: z.string(),
  first_name: z.string(),
  id: z.string(),
  last_name: z.string(),
  user_role: userRoleSchema,
});

export const versionRowSchema = z.object({
  agency_id: z.string(),
  ai_ending_message: z.string().nullable(),
  ai_instructions: z.string(),
  ai_interview_duration: z.number(),
  ai_questions: z.string().nullable(),
  ai_welcome_message: z.string().nullable(),
  candidate_estimated_time: z.string().nullable(),
  candidate_instructions: z.string(),
  candidate_intro_video_cover_image_url: z.string().nullable(),
  candidate_intro_video_url: z.string().nullable(),
  candidate_overview: z.string(),
  created_at: z.string(),
  id: z.string(),
  name: z.string(),
  status: versionStatusSchema,
  template_id: z.string(),
  updated_at: z.string(),
});
