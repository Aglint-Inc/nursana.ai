import { api } from 'trpc/client';

export const useUserData = () => api.user.get_data.useSuspenseQuery()[0];
