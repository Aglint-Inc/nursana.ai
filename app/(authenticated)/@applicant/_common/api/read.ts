import { type ApplicantProcedure, applicantProcedure } from '@/server/api/trpc';

const query = ({ ctx }: ApplicantProcedure) => ctx.applicant;

export const read = applicantProcedure.query(query);
