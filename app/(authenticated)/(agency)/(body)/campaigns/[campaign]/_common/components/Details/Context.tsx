import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from 'react';

import { useCampaignEdit } from '@/campaign/hooks/useCampaignEdit';
import { toast } from '@/hooks/use-toast';

const useDetailsContext = () => {
  const [mode, setMode] = useState<'edit' | 'view'>('view');
  const { isPending, ...mutation } = useCampaignEdit();

  const mutate = (input: Parameters<(typeof mutation)['mutate']>[0]) =>
    mutation.mutate(input, {
      onError: () => {
        toast({ title: 'Update failed', variant: 'destructive' });
      },
      onSuccess: () => {
        setMode('view');
      },
    });

  return {
    mode,
    setMode,
    mutate,
    isPending,
  };
};

const DetailsContext = createContext<
  ReturnType<typeof useDetailsContext> | undefined
>(undefined);

export const DetailsProvider = (props: PropsWithChildren) => {
  const value = useDetailsContext();
  return (
    <DetailsContext.Provider value={value}>
      {props.children}
    </DetailsContext.Provider>
  );
};

export const useDetails = () => {
  const value = useContext(DetailsContext);
  if (!value) throw new Error('Details Context not found as a Provider');
  return value;
};
