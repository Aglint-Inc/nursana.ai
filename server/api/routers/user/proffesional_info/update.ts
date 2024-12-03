import { z } from 'zod';

import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db/client';
import { applicantUserUpdateSchema } from '@/server/db/zod';

export const schema = applicantUserUpdateSchema
  .pick({
    proffessional_titles: true,
    specialties: true,
    npi_number: true,
    licenced_year: true,
    licensed_state: true,
    memberships: true,
    malpractice_insurance: true,
    preceptorship_interest: true,
    professional_highlight: true,
    salary_range: true,
    virtues: true,
    certification_agency: true,
    education_level: true,
    employment_interest: true,
    open_to_work: true,
    patients_attend_per_week: true,
    income_level: true,
    licence_number: true,
  })
  .extend({
    user_id: z.string(),
  });
const mutation = async ({ input }: PublicProcedure<typeof schema>) => {
  //
  const db = createPublicClient();
  await db
    .from('applicant_user')
    .update({
      proffessional_titles: input.proffessional_titles ?? undefined,
      specialties: input.specialties ?? undefined,
      npi_number: input.npi_number ?? undefined,
      licenced_year: input.licenced_year ?? undefined,
      licensed_state: input.licensed_state ?? undefined,
      memberships: input.memberships ?? undefined,
      malpractice_insurance: input.malpractice_insurance ?? undefined,
      preceptorship_interest: input.preceptorship_interest ?? undefined,
      professional_highlight: input.professional_highlight ?? undefined,
      salary_range: input.salary_range ?? undefined,
      virtues: input.virtues ?? undefined,
      certification_agency: input.certification_agency ?? undefined,
      education_level: input.education_level ?? undefined,
      employment_interest: input.employment_interest ?? undefined,
      open_to_work: input.open_to_work ?? undefined,
      patients_attend_per_week: input.patients_attend_per_week ?? undefined,
      income_level: input.income_level ?? undefined,
    })
    .eq('id', input.user_id)
    .select()
    .throwOnError();
};

export const updateProfessionalInfo = publicProcedure
  .input(schema)
  .mutation(mutation);
