import { api } from 'trpc/client';

export const useLocationsList = () => api.getLocationList.useSuspenseQuery()[0];
