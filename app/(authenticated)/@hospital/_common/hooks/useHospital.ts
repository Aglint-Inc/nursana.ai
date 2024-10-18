import { api } from 'trpc/client';

export const useHospital = () =>
  api.authenticated.hospital.read.useSuspenseQuery()[0];
