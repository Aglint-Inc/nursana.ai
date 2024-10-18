import { api, type RouterInputs, type Unvoid } from 'trpc/client';

import { toast } from '@/hooks/use-toast';

export const useUpdateInterviewsAnalysis = () => {
  const utils = api.useUtils();
  const updateMutation =
    api.interviewAnalysis.updateInterviewAnalysis.useMutation({
      onSuccess: () => {
        utils.interview.getInterviewDetails.invalidate();
      },
      onError: (e) => {
        toast({
          title: e.shape?.message,
        });
      },
    });
  const updateInterviewAnalysis = async (
    payload: Unvoid<
      RouterInputs['interviewAnalysis']['updateInterviewAnalysis']
    >,
  ) => {
    return await updateMutation.mutateAsync({
      ...payload,
    });
  };
  return { ...updateMutation, updateInterviewAnalysis };
};
