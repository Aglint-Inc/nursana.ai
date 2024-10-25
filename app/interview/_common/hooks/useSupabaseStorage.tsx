import { api, type RouterInputs, type Unvoid } from 'trpc/client';

import { toast } from '@/hooks/use-toast';

export const useUploadRecordedVideo = () => {
  const updateMutation = api.supabase_storage.uploadRecordedVideo.useMutation({
    onError: (e) => {
      toast({
        title: e.shape?.message,
      });
    },
  });
  const uploadRecordedVideo = async (
    payload: Unvoid<RouterInputs['supabase_storage']['uploadRecordedVideo']>,
  ) => {
    return await updateMutation.mutateAsync({
      ...payload,
    });
  };
  return { ...updateMutation, uploadRecordedVideo };
};
