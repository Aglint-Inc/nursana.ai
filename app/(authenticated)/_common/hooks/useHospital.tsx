import { api } from 'trpc/client';

export const useHospital = () => {
  return api.hospital.get_data.useSuspenseQuery()[0];
};
