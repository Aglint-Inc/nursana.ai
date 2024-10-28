import { api } from 'trpc/client';

export const useTemplates = () =>
  api.authenticated.agency.templates.read.useSuspenseQuery()[0];
