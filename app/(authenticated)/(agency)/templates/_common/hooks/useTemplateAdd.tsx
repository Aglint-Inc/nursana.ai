import { api } from 'trpc/client';

export const useTemplateAdd = () => {
  return api.authenticated.agency.templates.add.useMutation();
};
