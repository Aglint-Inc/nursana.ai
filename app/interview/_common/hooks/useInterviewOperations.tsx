import { api, type RouterInputs, type Unvoid } from 'trpc/client';

import { toast } from '@/hooks/use-toast';

export const useInterview = api.interview.getInterviewDetails.useQuery;

export const useUpdateInterviews = () => {
  const utils = api.useUtils();
  const updateMutation = api.interview.updateInterview.useMutation({
    onSuccess: () => {
      utils.interview.getInterviewDetails.invalidate();
    },
    onError: (e) => {
      toast({
        title: e.shape?.message,
      });
    },
  });
  const updateInterview = async (
    payload: Unvoid<RouterInputs['interview']['updateInterview']>,
  ) => {
    return await updateMutation.mutateAsync({
      ...payload,
    });
  };
  return { ...updateMutation, updateInterview };
};
