import { z as zod } from "zod";
export const schema = zod.object({
  basics: zod.object({
    currentJobTitle: zod
      .string()
      .describe("extract the current job title from resume text"),
    currentCompany: zod
      .string()
      .describe("extract the current company from resume text"),
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
      .describe("extract the current working location from resume text"),
    totalExperienceInMonths: zod
      .number()
      .nullable()
      .describe("total experience in months"),
  }),
  skills: zod.array(
    // zod.object({
    //   name: zod.string(),
    //   level: zod.string(),
    //   keywords: zod.array(zod.string()),
    // })
    zod.string()
  ),
  positions: zod.array(
    zod.object({
      org: zod.string(),
      title: zod.string(),
      // summary: zod.string(),
      description: zod.string().describe("return full description"),
      location: zod.string(),
      start: zod.object({
        year: zod.number().nullable(),
        month: zod.number().nullable(),
      }),
      level: zod.enum([
        "Fresher-level",
        "Associate-level",
        "Mid-level",
        "Senior-level",
        "Executive-level",
      ]),
      end: zod.object({
        year: zod.number().nullable(),
        month: zod.number().nullable(),
      }),
    })
  ),
  projects: zod.array(
    zod.object({
      title: zod.string(),
      summary: zod.string(),
    })
  ),
  schools: zod.array(
    zod.object({
      institution: zod.string(),
      degree: zod.string(),
      gpa: zod.number().nullable(),
      field: zod.string(),
      start: zod.object({
        year: zod.number().nullable(),
        month: zod.number().nullable(),
      }),
      end: zod.object({
        year: zod.number().nullable(),
        month: zod.number().nullable(),
      }),
    })
  ),
  languages: zod.array(zod.string()),
  certificates: zod.array(zod.string()),
});
export type schemaType = zod.infer<typeof schema>;
