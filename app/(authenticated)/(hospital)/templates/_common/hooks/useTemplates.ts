import { api } from 'trpc/client';

export const useTempalates = () =>
  api.authenticated.hospital.templates.read.useSuspenseQuery()[0];
