import { api } from 'trpc/client';

import { type Edit } from '../api/edit';
import { useVersionParams } from './useVersionParams';

export const useVersionEdit = () => {
  const { version } = useVersionParams();
  const mutation =
    api.authenticated.agency.templates.version.edit.useMutation();
  const mutate = (
    input: Omit<Edit['input'], 'id'>,
    mutationOptions?: Parameters<(typeof mutation)['mutate']>[1],
  ) => mutation.mutate({ id: version, ...input }, mutationOptions);
  return { ...mutation, mutate };
};
