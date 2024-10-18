import { api } from 'trpc/client';

export const useApplicant = () =>
  api.authenticated.applicant.read.useSuspenseQuery()[0];
