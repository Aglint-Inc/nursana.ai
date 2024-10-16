import { api } from 'trpc/client';

export const useUserAuth = () => {
  return api.user.auth.useQuery();
};
