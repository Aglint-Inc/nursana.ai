import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from 'react';

import { useAddCampaign } from '@/campaigns/hooks/useAddCampaign';

const useAddCampaignHook = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isPending, ...mutation } = useAddCampaign();

  const mutate = (input: Parameters<(typeof mutation)['mutate']>[0]) =>
    mutation.mutate(input, {
      onSuccess: () => {
        setIsOpen(false);
      },
    });

  return {
    isOpen,
    setIsOpen,
    isPending,
    mutate,
  };
};

const ActionContext = createContext<
  ReturnType<typeof useAddCampaignHook> | undefined
>(undefined);

export const ActionProvider = (props: PropsWithChildren) => {
  const { ...value } = useAddCampaignHook();
  return (
    <ActionContext.Provider value={value}>
      {props.children}
    </ActionContext.Provider>
  );
};

export const useAction = () => {
  const value = useContext(ActionContext);
  if (!value) throw new Error('Add campaign Context not found as a Provider');
  return value;
};
