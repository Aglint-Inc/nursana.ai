import { z } from 'zod';

export const ResumeDetailsTypeSchema = z.object({
  basics: z.object({
    email: z.string().email(),
    phone: z.string().regex(/^\d{10}$/),
    social: z.array(z.string().url()).optional(),
    lastName: z.string(),
    linkedIn: z.string().url().nullable(),
    location: z.object({
      city: z.string(),
      state: z.string(),
      country: z.string(),
    }),
    firstName: z.string(),
    currentCompany: z.string(),
    currentJobTitle: z.string(),
    professionalSummary: z.string().nullable(),
    totalExperienceInMonths: z.number().int(),
  }),
  skills: z.array(z.string()).optional(),
  schools: z
    .array(
      z.object({
        end: z.object({
          year: z.number().int(),
          month: z.number().int().nullable(),
        }),
        gpa: z.number().nullable(),
        field: z.string(),
        start: z.object({
          year: z.number().int(),
          month: z.number().int().nullable(),
        }),
        degree: z.string(),
        institution: z.string(),
      }),
    )
    .optional(),
  licenses: z
    .array(
      z.object({
        state: z.string(),
        issueDate: z.object({
          year: z.number().int(),
          month: z.number().int().nullable(),
        }),
        licenseType: z.string(),
        expirationDate: z.string().nullable(),
        issuingAuthority: z.string(),
      }),
    )
    .optional(),
  languages: z.array(z.string()).optional(),
  positions: z
    .array(
      z.object({
        end: z.object({
          year: z.number().int(),
          month: z.number().int().nullable(),
        }),
        org: z.string(),
        level: z.string(),
        start: z.object({
          year: z.number().int(),
          month: z.number().int().nullable(),
        }),
        title: z.string(),
        location: z.string(),
        description: z.string(),
      }),
    )
    .optional(),
  achievements: z.array(z.string()).optional(),
  certificates: z
    .array(
      z.object({
        title: z.string(),
        dateObtained: z.object({
          year: z.number().int().nullable(),
          month: z.number().int().nullable(),
        }),
        issuingAuthority: z.string(),
      }),
    )
    .optional(),
  geoDataAndExp: z
    .array(
      z.object({
        state: z.string(),
        country: z.string(),
        geolocation: z.string(),
        experience_in_months: z.number().int(),
      }),
    )
    .optional(),
  volunteerWork: z.array(z.string()).optional(),
  specializations: z.array(z.string()).optional(),
  clinicalExperience: z.array(z.string()).optional(),
});

export type ResumeDetailsType = z.infer<typeof ResumeDetailsTypeSchema>;
