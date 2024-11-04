import { z } from 'zod';

export const resumeReviewSchema = z.object({
  professional_summary: z.object({
    score: z.number(),
    comment: z.string(),
    feedback: z.string(),
  }),
  experience_relevance_and_clarity: z.object({
    score: z.number(),
    comment: z.string(),
    feedback: z.string(),
  }),
  skills_and_keywords: z.object({
    score: z.number(),
    comment: z.string(),
    feedback: z.string(),
  }),
  achievements_and_metrics: z.object({
    score: z.number(),
    comment: z.string(),
    feedback: z.string(),
  }),
  education: z.object({
    score: z.number(),
    comment: z.string(),
    feedback: z.string(),
  }),
  grammar_and_language: z.object({
    score: z.number(),
    comment: z.string(),
    feedback: z.string(),
  }),
  overall_feedback: z.string(),
  overall_comment: z.string(),
});
export type scoringSchemaType = z.infer<typeof resumeReviewSchema>;
export type overallScoringSchemaType = z.infer<typeof resumeReviewSchema> & {
  overall_score?: number;
};

export const resumeSchema = z.object({
  basics: z.object({
    currentJobTitle: z
      .string()
      .describe(
        'Extract the current job title from resume text (e.g., Registered Nurse, Nurse Practitioner)',
      ),
    currentCompany: z
      .string()
      .describe('Extract the current healthcare institution or agency name'),
    professionalSummary: z
      .string()
      .nullable()
      .describe('Extract a professional summary from the resume'),
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().nullable(),
    phone: z.string().nullable(),
    linkedIn: z.string().nullable(),
    social: z.array(z.string()),
    location: z
      .object({
        city: z.string(),
        state: z.string(),
        country: z.string(),
      })
      .nullable()
      .describe(
        'Extract the current working location from resume text (e.g., city and state of the healthcare institution)',
      ),
    totalExperienceInMonths: z
      .number()
      .nullable()
      .describe('Total experience in months working as a nurse'),
  }),
  skills: z.array(
    z
      .string()
      .describe(
        'Skills specific to nursing, e.g., Patient Care, Emergency Room, IV Therapy',
      ),
  ),
  specializations: z.array(
    z
      .string()
      .describe('Nursing specializations (e.g., Pediatric Nurse, ICU Nurse)'),
  ),
  positions: z.array(
    z.object({
      org: z.string().describe('Name of the agency or healthcare institution'),
      title: z.string().describe('Nursing position title'),
      description: z
        .string()
        .describe(
          'Return full description of duties and responsibilities as a nurse',
        ),
      location: z.string().describe('Location of the healthcare facility'),
      start: z.object({
        year: z.number().nullable(),
        month: z.number().nullable(),
      }),
      level: z.enum([
        'Fresher-level',
        'Associate-level',
        'Mid-level',
        'Senior-level',
        'Executive-level',
      ]),
      end: z.object({
        year: z.number().nullable(),
        month: z.number().nullable(),
      }),
    }),
  ),
  clinicalExperience: z.array(
    z.object({
      department: z
        .string()
        .describe('Specific clinical department or unit (e.g., ICU, ER)'),
      durationInMonths: z
        .number()
        .nullable()
        .describe('Duration of clinical experience in this area'),
    }),
  ),
  volunteerWork: z.array(
    z.object({
      organization: z.string().describe('Name of the volunteer organization'),
      role: z.string().describe('Role or position as a volunteer'),
      description: z
        .string()
        .describe('Description of volunteer duties related to nursing'),
      durationInMonths: z
        .number()
        .nullable()
        .describe('Total duration of volunteer work'),
    }),
  ),
  achievements: z.array(
    z
      .string()
      .describe(
        'Nursing-related awards or recognitions (e.g., Nurse of the Year)',
      ),
  ),
  schools: z.array(
    z.object({
      institution: z.string(),
      degree: z
        .string()
        .describe('Degree or certification in nursing (e.g., BSN, MSN)'),
      gpa: z.number().nullable(),
      field: z.string().describe('Field of study (e.g., Nursing)'),
      start: z.object({
        year: z.number().nullable(),
        month: z.number().nullable(),
      }),
      end: z.object({
        year: z.number().nullable(),
        month: z.number().nullable(),
      }),
    }),
  ),
  licenses: z.array(
    z.object({
      licenseType: z
        .string()
        .describe('Type of nursing license (e.g., RN, LPN)'),
      issuingAuthority: z
        .string()
        .describe('Issuing authority of the nursing license'),
      state: z.string().describe('State where the license is valid'),
      issueDate: z
        .object({
          year: z.number().nullable(),
          month: z.number().nullable(),
        })
        .nullable(),
      expirationDate: z
        .object({
          year: z.number().nullable(),
          month: z.number().nullable(),
        })
        .nullable(),
    }),
  ),
  languages: z.array(
    z
      .string()
      .describe(
        'Languages spoken, which could be relevant for patient communication',
      ),
  ),
  certificates: z.array(
    z.object({
      title: z
        .string()
        .describe('Title of the certificate (e.g., BLS, ACLS, CCRN)'),
      issuingAuthority: z
        .string()
        .describe('Issuing authority of the certificate'),
      dateObtained: z
        .object({
          year: z.number().nullable(),
          month: z.number().nullable(),
        })
        .nullable(),
    }),
  ),
});
export type schemaType = z.infer<typeof resumeSchema>;
