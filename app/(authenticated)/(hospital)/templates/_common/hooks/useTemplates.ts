import { api } from 'trpc/client';

export const useTemplates = () =>
  api.authenticated.hospital.templates.read.useSuspenseQuery()[0];
