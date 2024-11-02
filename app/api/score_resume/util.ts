import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
// import { zodToJsonSchema } from "zod-to-json-schema";

export async function score<T extends z.ZodSchema>(
  systemPrompt: string,
  data: string,
  schema: T,
) {
  const { object, usage } = await generateObject<z.infer<T>>({
    model: openai('gpt-4o'),
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
  'technical_skills',
] as const;

const scoringAspectsSchema = {
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

export const PromptArchive: {
  key: (typeof scoringAspects)[number];
  prompt: string;
  dataMapper: (
    _: schemaType,
  ) => { error: null; result: string } | { error: string; result: null };
  schema: (typeof scoringAspectsSchema)[(typeof scoringAspects)[number]];
}[] = [
  {
    key: 'education_and_certifications',
    prompt: `You will receive a resume in JSON format. Analyze the "Education" and "Certifications" sections and provide constructive feedback. Evaluate if the education is clearly listed and recommend any ways to better highlight achievements or quantify results. Provide specific suggestions for improvement in each area, if applicable, to help strengthen this resume for job applications. Also, give it a score with reasoning for the score and specific guidance on how to improve. Provide the output in JSON format.`,
    dataMapper(data) {
      if (
        data.schools?.length &&
        data.certificates?.length &&
        data.specializations?.length
      ) {
        return {
          error: 'No Relevant data',
          result: null,
        };
      } else {
        const result = JSON.stringify({
          degree: (data.schools || []).map((sch) => ({
            degree: sch.degree,
            gpa: sch.gpa,
            field: sch.field,
          })),
          certifications: (data.certificates || []).map((cert) => cert.title),
          specializations: data.specializations || [],
        });
        return { error: null, result };
      }
    },
    schema: scoringAspectsSchema['education_and_certifications'],
  },
  {
    key: 'licensure',
    prompt: `You will receive a resume in JSON format. Please evaluate the "licensure" based on whether the candidate provides clear, quantifiable accomplishments (e.g., percentages, metrics). Suggest any areas where achievements could be better emphasized or quantified. Provide specific suggestions for improvement in each area, if applicable, to help strengthen this resume for job applications. Also, give it a score with reasoning for the score and specific guidance on how to improve. Provide the output in JSON format.`,
    dataMapper(data) {
      if (data.licenses?.length) {
        return { error: 'No Relevant data', result: null };
      } else {
        const result = JSON.stringify({
          today_Date: new Date().toDateString(),
          license: (data.licenses || []).map((lic) => {
            return {
              licenseType: lic.licenseType,
              issuingAuthority: lic.issuingAuthority,
              state: lic.state,
              issueDate: lic.issueDate,
              expirationDate: lic.expirationDate,
            };
          }),
        });
        return { error: null, result };
      }
    },
    schema: scoringAspectsSchema['licensure'],
  },
  {
    key: 'experience',
    prompt: `You will receive a resume in JSON format. Assess the relevance of listed "experiences" to the candidate's stated career goals. Are job titles, responsibilities, and accomplishments clear and impactful? Recommend any ways to better highlight achievements or quantify results. Provide specific suggestions for improvement in each area, if applicable, to help strengthen this resume for job applications. Also, give it a score with reasoning for the score and specific guidance on how to improve. Provide the output in JSON format.`,
    dataMapper(data) {
      if (
        data.positions?.length &&
        data.specializations?.length &&
        data.basics.totalExperienceInMonths
      ) {
        return { error: 'No Relevant data', result: null };
      } else {
        const result = JSON.stringify({
          years_of_experience:
            data.basics.totalExperienceInMonths || 'No Provided',
          healthcare_settings: (data.positions || []).map((pos) => ({
            title: pos.title,
            location: pos.location,
            start: pos.start,
            end: pos.end,
          })),
          specialties: data.specializations || [],
          leadership_roles: (data.positions || []).map((pos) => pos.title),
        });
        return { error: null, result };
      }
    },
    schema: scoringAspectsSchema['experience'],
  },
  {
    key: 'technical_skills',
    prompt: `You will receive a resume in JSON format. Identify any key "skills" or industry-specific keywords that may be missing, considering the candidate's target role and industry. Are the skills appropriately showcased, and do they reflect current industry demands? Provide specific suggestions for improvement in each area, if applicable, to help strengthen this resume for job applications. Also, give it a score with reasoning for the score and specific guidance on how to improve. Provide the output in JSON format.`,
    dataMapper(data) {
      if (data.skills?.length && data.positions?.length) {
        return { error: 'No Relevant data', result: null };
      } else {
        const result = JSON.stringify({
          skills: data.skills || [],
          experience: (data.positions || []).map((pos) => pos.description),
        });
        return { error: null, result };
      }
    },
    schema: scoringAspectsSchema['technical_skills'],
  },
];

export const schema = z.object({
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
export type schemaType = z.infer<typeof schema>;
export type ResumeStructureType = z.infer<typeof schema>;

export type scoringSchemaType = {
  [key in (typeof scoringAspects)[number]]: z.infer<
    (typeof scoringAspectsSchema)[key]
  > & { sectionScore?: number };
};

export const calculateAllSectionScore = (inData: scoringSchemaType) => {
  const data = structuredClone(inData);
  let totalScore = 0;
  const aspects = Object.keys(data) as unknown as typeof scoringAspects;
  aspects.forEach((aspect) => {
    if (data?.[aspect]) {
      const temp = calculateSectionScore(aspect, data[aspect] || {}) || 0;
      totalScore += temp;
      data[aspect]['sectionScore'] = temp;
    }
  });
  return {
    scoredSections: data,
    overallScore: totalScore / scoringAspects.length,
  };
};

function calculateSectionScore<T extends (typeof scoringAspects)[number]>(
  key: T,
  section: scoringSchemaType[T],
) {
  switch (key) {
    case 'education_and_certifications': {
      const { degree, certifications, specializations } =
        section as unknown as z.infer<
          (typeof scoringAspectsSchema)['education_and_certifications']
        >;
      return (
        (((degree.rating || 1) +
          (certifications.rating || 1) +
          (specializations.rating || 1)) /
          25) *
        100
      );
    }
    case 'licensure': {
      const { active_license, expiration_date } = section as unknown as z.infer<
        (typeof scoringAspectsSchema)['licensure']
      >;
      return (
        (((active_license.rating || 1) + (expiration_date.rating || 1)) / 15) *
        100
      );
    }
    case 'experience': {
      const {
        years_of_experience,
        healthcare_settings,
        leadership_roles,
        specialties,
      } = section as unknown as z.infer<
        (typeof scoringAspectsSchema)['experience']
      >;
      return (
        (((years_of_experience.rating || 1) +
          (healthcare_settings.rating || 1) +
          (leadership_roles.rating || 1) +
          (specialties.rating || 1)) /
          25) *
        100
      );
    }
    case 'technical_skills': {
      const { equipment, software, telemedicine } =
        section as unknown as z.infer<
          (typeof scoringAspectsSchema)['technical_skills']
        >;
      return (
        (((equipment.rating || 1) +
          (software.rating || 1) +
          (telemedicine.rating || 1)) /
          13) *
        100
      );
    }
    default:
      return null;
  }
}

const professionalSummarySchema = {
  summary_feedback: z.object({
    summary: z.string(),
    overall_feedback: z.string(),
  }),
} as const;

export type professionalSummaryType = {
  [K in keyof typeof professionalSummarySchema]: z.infer<
    (typeof professionalSummarySchema)[K]
  >;
};

export const professionalSummaryPromptArchive: {
  prompt: string;
  key: keyof typeof professionalSummarySchema;
  dataMapper: (_: {
    score_json: scoringSchemaType;
    json: schemaType;
  }) => { error: null; result: string } | { error: string; result: null };
  schema: (typeof professionalSummarySchema)[keyof typeof professionalSummarySchema];
}[] = [
  {
    key: 'summary_feedback',
    dataMapper: ({ score_json }) => {
      try {
        const st = Object.keys(score_json).reduce((acc, key) => {
          let temp = '';
          const curr = score_json[key as keyof typeof score_json];
          if (curr) {
            if (curr.feedback) {
              //@ts-ignore
              curr.feedback = undefined;
            }
            if (curr.suggestions) {
              //@ts-ignore
              curr.suggestions = undefined;
            }
            temp = JSON.stringify(curr);
          }
          return acc + temp;
        }, '');
        return { result: st, error: null };
      } catch (e: any) {
        return { result: null, error: String(e) };
      }
    },
    prompt: `You will receive the evaluation results of a nurse's resume in JSON format, which includes the assessments for licensure, experience, and education & certifications. Summarize the information for recruiter in summary and provide overall_feedback (use suggestions) for candidate . Don't mention ratings in summary`,
    schema: professionalSummarySchema['summary_feedback'],
  },
  // {
  //   key: 'professional_summary',
  //   dataMapper: ({ json }) => {
  //     try {
  //       const st = JSON.stringify(json.basics);
  //       return { result: st, error: null };
  //     } catch (e: any) {
  //       return { result: null, error: String(e) };
  //     }
  //   },
  //   prompt: `...`,
  //   schema: professionalSummarySchema['summary'],
  // },
];
