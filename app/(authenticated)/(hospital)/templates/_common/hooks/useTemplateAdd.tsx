import { api } from 'trpc/client';

export const useTemplateAdd = () => {
  const mutation = api.authenticated.hospital.templates.add.useMutation();

  return mutation;
};
