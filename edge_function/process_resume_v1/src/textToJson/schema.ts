import { z as zod } from 'zod';
// import { zodToJsonSchema } from "zod-to-json-schema";

export const schema = zod.object({
  basics: zod.object({
    currentJobTitle: zod
      .string()
      .describe(
        'Extract the current job title from resume text (e.g., Registered Nurse, Nurse Practitioner)',
      ),
    currentCompany: zod
      .string()
      .describe('Extract the current healthcare institution or agency name'),
    professionalSummary: zod
      .string()
      .nullable()
      .describe('Extract a professional summary from the resume'),
    firstName: zod.string(),
    lastName: zod.string(),
    email: zod.string().nullable(),
    phone: zod.string().nullable(),
    linkedIn: zod.string().nullable(),
    social: zod.array(zod.string()),
    location: zod
      .object({
        city: zod.string(),
        state: zod.string(),
        country: zod.string(),
      })
      .nullable()
      .describe(
        'Extract the current working location from resume text (e.g., city and state of the healthcare institution)',
      ),
    totalExperienceInMonths: zod
      .number()
      .nullable()
      .describe('Total experience in months working as a nurse'),
  }),
  skills: zod.array(
    zod
      .string()
      .describe(
        'Skills specific to nursing, e.g., Patient Care, Emergency Room, IV Therapy',
      ),
  ),
  specializations: zod.array(
    zod
      .string()
      .describe('Nursing specializations (e.g., Pediatric Nurse, ICU Nurse)'),
  ),
  positions: zod.array(
    zod.object({
      org: zod
        .string()
        .describe('Name of the agency or healthcare institution'),
      title: zod.string().describe('Nursing position title'),
      description: zod
        .string()
        .describe(
          'Return full description of duties and responsibilities as a nurse',
        ),
      location: zod.string().describe('Location of the healthcare facility'),
      start: zod.object({
        year: zod.number().nullable(),
        month: zod.number().nullable(),
      }),
      level: zod.enum([
        'Fresher-level',
        'Associate-level',
        'Mid-level',
        'Senior-level',
        'Executive-level',
      ]),
      end: zod.object({
        year: zod.number().nullable(),
        month: zod.number().nullable(),
      }),
    }),
  ),
  clinicalExperience: zod.array(
    zod.object({
      department: zod
        .string()
        .describe('Specific clinical department or unit (e.g., ICU, ER)'),
      durationInMonths: zod
        .number()
        .nullable()
        .describe('Duration of clinical experience in this area'),
    }),
  ),
  volunteerWork: zod.array(
    zod.object({
      organization: zod.string().describe('Name of the volunteer organization'),
      role: zod.string().describe('Role or position as a volunteer'),
      description: zod
        .string()
        .describe('Description of volunteer duties related to nursing'),
      durationInMonths: zod
        .number()
        .nullable()
        .describe('Total duration of volunteer work'),
    }),
  ),
  achievements: zod.array(
    zod
      .string()
      .describe(
        'Nursing-related awards or recognitions (e.g., Nurse of the Year)',
      ),
  ),
  schools: zod.array(
    zod.object({
      institution: zod.string(),
      degree: zod
        .string()
        .describe('Degree or certification in nursing (e.g., BSN, MSN)'),
      gpa: zod.number().nullable(),
      field: zod.string().describe('Field of study (e.g., Nursing)'),
      start: zod.object({
        year: zod.number().nullable(),
        month: zod.number().nullable(),
      }),
      end: zod.object({
        year: zod.number().nullable(),
        month: zod.number().nullable(),
      }),
    }),
  ),
  licenses: zod.array(
    zod.object({
      licenseType: zod
        .string()
        .describe('Type of nursing license (e.g., RN, LPN)'),
      issuingAuthority: zod
        .string()
        .describe('Issuing authority of the nursing license'),
      state: zod.string().describe('State where the license is valid'),
      issueDate: zod
        .object({
          year: zod.number().nullable(),
          month: zod.number().nullable(),
        })
        .nullable(),
      expirationDate: zod
        .object({
          year: zod.number().nullable(),
          month: zod.number().nullable(),
        })
        .nullable(),
    }),
  ),
  languages: zod.array(
    zod
      .string()
      .describe(
        'Languages spoken, which could be relevant for patient communication',
      ),
  ),
  certificates: zod.array(
    zod.object({
      title: zod
        .string()
        .describe('Title of the certificate (e.g., BLS, ACLS, CCRN)'),
      issuingAuthority: zod
        .string()
        .describe('Issuing authority of the certificate'),
      dateObtained: zod
        .object({
          year: zod.number().nullable(),
          month: zod.number().nullable(),
        })
        .nullable(),
    }),
  ),
});
// console.log(JSON.stringify(zodToJsonSchema(schema), null, 2));
export type schemaType = zod.infer<typeof schema>;
