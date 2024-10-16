import { api } from 'trpc/client';

export function useNurseData() {
  const { data, isLoading, error, refetch } = api.user.get_data.useQuery();

  return {
    nurseData: data,
    isLoading,
    error,
    refetch,
  };
}