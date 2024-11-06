import { z } from 'zod';

export const scoringAspectsSchema = {
  education_and_certifications: z.object({
    degree: z.object({
      rating: z.number(),
      comments: z.string(),
    }),
    certifications: z.object({
      rating: z.number(),
      comments: z.string(),
    }),
    specializations: z.object({
      rating: z.number(),
      comments: z.string(),
    }),
    feedback: z.string(),
    suggestions: z.string(),
  }),
  licensure: z.object({
    active_license: z.object({
      rating: z.number(),
      comments: z.string(),
    }),
    expiration_date: z.object({
      rating: z.number(),
      comments: z.string(),
    }),
    feedback: z.string(),
    suggestions: z.string(),
  }),
  experience: z.object({
    years_of_experience: z.object({
      rating: z.number(),
      comments: z.string(),
    }),
    healthcare_settings: z.object({
      rating: z.number(),
      comments: z.string(),
    }),
    specialties: z.object({
      rating: z.number(),
      comments: z.string(),
    }),
    leadership_roles: z.object({
      rating: z.number(),
      comments: z.string(),
    }),
    feedback: z.string(),
    suggestions: z.string(),
  }),
  technical_skills: z.object({
    software: z.object({
      rating: z.number(),
      comments: z.string(),
    }),
    equipment: z.object({
      rating: z.number(),
      comments: z.string(),
    }),
    telemedicine: z.object({
      rating: z.number(),
      comments: z.string(),
    }),
    feedback: z.string(),
    suggestions: z.string(),
  }),
};
