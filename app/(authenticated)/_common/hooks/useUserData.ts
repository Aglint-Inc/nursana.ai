import { api, type RouterInputs, type Unvoid } from 'trpc/client';

import { toast } from '@/hooks/use-toast';

export const useUserData = () => api.user.get_data.useSuspenseQuery()[0];

export const useUpdateUserData = () => {
  const utils = api.useUtils();
  const updateMutation = api.user.updateUser.useMutation({
    onSuccess: () => {
      utils.user.get_data.invalidate();
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated',
      });
    },
    onError: (e) => {
      toast({
        title: e.shape?.message,
      });
    },
  });
  const updateUserDetails = async (
    payload: Unvoid<RouterInputs['user']['updateUser']>,
  ) => {
    return await updateMutation.mutateAsync({
      ...payload,
    });
  };
  return { ...updateMutation, updateUserDetails };
};
