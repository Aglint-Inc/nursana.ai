import { api } from 'trpc/client';

export function useUserData() {
  const { data, isLoading, error, refetch } = api.user.get_data.useQuery();

  return {
    userData: data,
    isLoading,
    error,
    refetch,
  };
}
