import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z, z as zod } from 'zod';
// import { zodToJsonSchema } from "zod-to-json-schema";

export async function score(
  systemPrompt: string,
  data: string,
  schema: z.ZodSchema<any>,
) {
  const { object, usage } = await generateObject({
    model: openai('gpt-4o-mini'),
    system: systemPrompt,
    prompt: data,
    schema,
  });
  return { object, usage };
}

const scoringAspects = [
  'education_and_certifications',
  'licensure',
  'experience',
  'technicalSkills',
] as const;

const scoringAspectsSchema: {
  [_key in (typeof scoringAspects)[number]]: z.ZodSchema<unknown>;
} = {
  education_and_certifications: z.object({
    degree: z.string(),
    certifications: z.array(z.string()),
    specializations: z.array(z.string()),
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
  }),
  technicalSkills: z.object({
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
  }),
};

export const PromptArchive: {
  key: (typeof scoringAspects)[number];
  prompt: string;
  dataMapper: (_: schemaType) => string;
  schema: (typeof scoringAspectsSchema)[(typeof scoringAspects)[number]];
}[] = [
  {
    key: 'education_and_certifications',
    prompt: `You will receive a nurse's resume in JSON format. Please evaluate the "Education" and "Certifications" fields based on the following criteria and output the result in JSON format:
                1. **Nursing Degree** (Rate 1-10):
                - Rate higher for advanced degrees (e.g., BSN = 7, MSN = 9, DNP = 10).
                - If no degree is specified or below the required level, rate 1-5.

                2. **Certifications** (Rate 1-10):
                - High score for multiple relevant certifications (e.g., RN, LPN, BLS, ACLS).
                - Lower score if missing essential certifications.

                3. **Specializations** (Rate 1-5):
                - 5 for relevant specialties (e.g., pediatrics, ICU, ER).
                - 1 if no specialization is listed.`,
    dataMapper(data) {
      return JSON.stringify({
        degree: data.schools.map((sch) => ({
          degree: sch.degree,
          gpa: sch.gpa,
          field: sch.field,
        })),
        certifications: data.certificates.map((cert) => cert.title),
        specializations: data.specializations,
      });
    },
    schema: scoringAspectsSchema['education_and_certifications'],
  },
  {
    key: 'licensure',
    prompt: `You will receive a nurse's resume in JSON format. Please evaluate the "licensure" based on the following criteria and output the result in JSON format:
                1. **Active Nursing Licensee** (Rate 1-10):
                - 10 if the license is active and up-to-date.
                - Deduct points if there’s no license mentioned or if expired.

                2. **Expiration Date** (Rate 1-5):
                - 5 if the expiration is at least one year away.
                - 3 if the expiration is within one year.
                - 1 if expired or not listed.`,
    dataMapper(data) {
      return JSON.stringify({
        toDayData: new Date().toDateString(),
        license: data.licenses.map((lic) => {
          return {
            licenseType: lic.licenseType,
            issuingAuthority: lic.issuingAuthority,
            state: lic.state,
            issueDate: lic.issueDate,
            expirationDate: lic.expirationDate,
          };
        }),
      });
    },
    schema: scoringAspectsSchema['licensure'],
  },
  {
    key: 'experience',
    prompt: `You will receive a nurse's resume in JSON format. Please evaluate the "Experience" based on the following criteria and output the result in JSON format:
                1. **Years of Experience ** (Rate 1-10):
                - 10 for 10+ years of relevant experience.
                - Deduct points for less experience (e.g., 1-3 years = 3, 5-9 years = 7).

                2. **Healthcare Settings** (Rate 1-5):
                - 5 for experience in relevant settings (e.g., hospital, ER, outpatient clinic).
                - Lower score for irrelevant settings or limited variety.
                
                3. **Specialties** (Rate 1-5):
                - 5 for relevant specialties (e.g., ICU, ER, oncology).
                - 1 for general practice only or irrelevant specialties.

                4. **Leadership Roles** (Rate 1-5):
                - 5 for leadership positions (e.g., charge nurse, head nurse).
                - 1 if no leadership experience is mentioned.`,
    dataMapper(data) {
      return JSON.stringify({
        years_of_experience: data.basics.totalExperienceInMonths,
        healthcare_settings: data.positions.map((pos) => ({
          title: pos.title,
          location: pos.location,
          start: pos.start,
          end: pos.end,
        })),
        specialties: data.specializations,
        leadership_roles: data.positions.map((pos) => pos.title),
      });
    },
    schema: scoringAspectsSchema['experience'],
  },
  {
    key: 'technicalSkills',
    prompt: `You will receive a nurse's resume in JSON format. Please evaluate the "Technical Skills" based on the following criteria and output the result in JSON format:
                1. **Healthcare Software ** (Rate 1-5):
                - 5 for proficiency with EHR systems like Epic, Cerner.
                - Deduct points for limited software experience.

                2. **Medical Equipment** (Rate 1-5):
                - 5 for experience handling advanced medical equipment.
                - 1 for basic or no equipment experience.
                
                3. **Telemedicine** (Rate 1-3):
                - 3 for extensive telemedicine experience.
                - 1 if no telemedicine experience.`,
    dataMapper(data) {
      return JSON.stringify({
        skills: data.skills,
        experience: data.positions.map((pos) => pos.description),
      });
    },
    schema: scoringAspectsSchema['technicalSkills'],
  },
];

export const schema = zod.object({
  basics: zod.object({
    currentJobTitle: zod
      .string()
      .describe(
        'Extract the current job title from resume text (e.g., Registered Nurse, Nurse Practitioner)',
      ),
    currentCompany: zod
      .string()
      .describe('Extract the current healthcare institution or hospital name'),
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
        .describe('Name of the hospital or healthcare institution'),
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
export type schemaType = zod.infer<typeof schema>;
