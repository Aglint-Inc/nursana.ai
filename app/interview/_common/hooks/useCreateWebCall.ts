import { api, type RouterInputs, type Unvoid } from 'trpc/client';

import { toast } from '@/hooks/use-toast';

export const useCreateWelCall = () => {
  const updateMutation = api.interview.createWebCall.useMutation({
    onError: (e) => {
      toast({
        title: e.shape?.message,
      });
    },
  });
  const createWebCall = async (
    payload: Unvoid<RouterInputs['interview']['createWebCall']>,
  ) => {
    return await updateMutation.mutateAsync({
      ...payload,
    });
  };
  return { ...updateMutation, createWebCall };
};
