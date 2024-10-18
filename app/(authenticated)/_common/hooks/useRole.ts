import { api } from 'trpc/client';

export const useRole = () => api.authenticated.role.useSuspenseQuery()[0];
