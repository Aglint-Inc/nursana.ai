import { api, type RouterInputs, type Unvoid } from 'trpc/client';

import { toast } from '@/hooks/use-toast';

export const useUserData = () => api.user.get_data.useSuspenseQuery()[0];
export const useUserDataQuery = () => api.user.get_data.useQuery();

export const usePreferredJobTitles = () =>
  api.user.getPreferredJobTitles.useSuspenseQuery()[0];

export const usePreferredJobTypes = () =>
  api.user.getPreferredJobTypes.useSuspenseQuery()[0];

export const usePreferredJobLocations = () =>
  api.user.getPreferredJobLocations.useSuspenseQuery()[0];

export const useUpdateUserData = () => {
  const utils = api.useUtils();
  const updateMutation = api.user.updateUser.useMutation({
    onSuccess: () => {
      utils.user.get_data.invalidate();
    },
    onError: (e) => {
      toast({
        title: JSON.parse(e.message)[0].message,
        variant: 'destructive',
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

export const useCreatePreferredJobTitle = () => {
  const utils = api.useUtils();
  const updateMutation = api.user.createPreferredJobTitles.useMutation({
    onSuccess: () => {
      utils.user.getPreferredJobTitles.invalidate();
    },
    onError: (e) => {
      toast({
        title: e.shape?.message,
      });
    },
  });
  const createPreferredJobTitles = async (
    payload: Unvoid<RouterInputs['user']['createPreferredJobTitles']>,
  ) => {
    return await updateMutation.mutateAsync({
      ...payload,
    });
  };
  return { ...updateMutation, createPreferredJobTitles };
};

export const useCreatePreferredJobType = () => {
  const utils = api.useUtils();
  const updateMutation = api.user.createPreferredJobTypes.useMutation({
    onSuccess: () => {
      utils.user.getPreferredJobTypes.invalidate();
    },
    onError: (e) => {
      toast({
        title: e.shape?.message,
      });
    },
  });
  const createPreferredJobTypes = async (
    payload: Unvoid<RouterInputs['user']['createPreferredJobTypes']>,
  ) => {
    return await updateMutation.mutateAsync({
      ...payload,
    });
  };
  return { ...updateMutation, createPreferredJobTypes };
};

export const useCreatePreferredLocation = () => {
  const utils = api.useUtils();
  const updateMutation = api.user.createPreferredJobLocations.useMutation({
    onSuccess: () => {
      utils.user.getPreferredJobLocations.invalidate();
    },
    onError: (e) => {
      toast({
        title: e.shape?.message,
      });
    },
  });
  const createPreferredLocations = async (
    payload: Unvoid<RouterInputs['user']['createPreferredJobLocations']>,
  ) => {
    return await updateMutation.mutateAsync({
      ...payload,
    });
  };
  return { ...updateMutation, createPreferredLocations };
};

export const useDeletePreferredJobTitle = () => {
  const utils = api.useUtils();
  const updateMutation = api.user.deletePreferredJobTitles.useMutation({
    onSuccess: () => {
      utils.user.getPreferredJobTitles.invalidate();
    },
    onError: (e) => {
      toast({
        title: e.shape?.message,
      });
    },
  });
  const deletePreferredJobTitles = async (
    payload: Unvoid<RouterInputs['user']['deletePreferredJobTitles']>,
  ) => {
    return await updateMutation.mutateAsync({
      ...payload,
    });
  };
  return { ...updateMutation, deletePreferredJobTitles };
};

export const useDeletePreferredJObType = () => {
  const utils = api.useUtils();
  const updateMutation = api.user.deletePreferredJobTypes.useMutation({
    onSuccess: () => {
      utils.user.getPreferredJobTypes.invalidate();
    },
    onError: (e) => {
      toast({
        title: e.shape?.message,
      });
    },
  });
  const deletePreferredJobTypes = async (
    payload: Unvoid<RouterInputs['user']['deletePreferredJobTypes']>,
  ) => {
    return await updateMutation.mutateAsync({
      ...payload,
    });
  };
  return { ...updateMutation, deletePreferredJobTypes };
};

export const useDeletePreferredLocation = () => {
  const utils = api.useUtils();
  const updateMutation = api.user.deletePreferredJobLocations.useMutation({
    onSuccess: () => {
      utils.user.getPreferredJobLocations.invalidate();
    },
    onError: (e) => {
      toast({
        title: e.shape?.message,
      });
    },
  });
  const deletePreferredLocations = async (
    payload: Unvoid<RouterInputs['user']['deletePreferredJobLocations']>,
  ) => {
    return await updateMutation.mutateAsync({
      ...payload,
    });
  };
  return { ...updateMutation, deletePreferredLocations };
};

export const useProfessionalInfo = () => {
  return api.user.professionalInfo.get.useQuery();
};

export const useUpdateProfessionalInfo = () => {
  const utils = api.useUtils();

  const updateMutation = api.user.professionalInfo.update.useMutation({
    onSuccess: () => {
      utils.user.professionalInfo.get.invalidate();
    },
    onError: (e) => {
      console.error(e);
      toast({
        title: `Error updating professional information`,
      });
    },
  });
  const updateProffessionalInfo = async (
    payload: Unvoid<RouterInputs['user']['professionalInfo']['update']>,
  ) => {
    return await updateMutation.mutateAsync({ ...payload });
  };
  return { updateProffessionalInfo };
};
