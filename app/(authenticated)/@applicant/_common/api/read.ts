import { applicantProcedure, type ApplicantProcedure } from '@/server/api/trpc';

const query = ({ ctx }: ApplicantProcedure) => ctx.applicant;

export const read = applicantProcedure.query(query);
