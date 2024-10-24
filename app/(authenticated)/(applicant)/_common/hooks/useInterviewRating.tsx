import { api, type RouterInputs, type Unvoid } from 'trpc/client';

import { toast } from '@/hooks/use-toast';

export const useInterviewRating = () =>
  api.interviewFeedback.getUserInterviewRating.useSuspenseQuery()[0];
export const useCreateInterviewRating = () => {
  const utils = api.useUtils();
  const updateMutation =
    api.interviewFeedback.createInterviewRating.useMutation({
      onSuccess: () => {
        utils.interviewFeedback.getUserInterviewRating.invalidate();
      },
      onError: (e) => {
        toast({
          title: e.shape?.message,
        });
      },
    });
  const createInterviewRating = async (
    payload: Unvoid<RouterInputs['interviewFeedback']['createInterviewRating']>,
  ) => {
    return await updateMutation.mutateAsync({
      ...payload,
    });
  };
  return { ...updateMutation, createInterviewRating };
};
