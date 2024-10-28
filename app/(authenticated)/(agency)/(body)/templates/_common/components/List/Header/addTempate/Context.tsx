import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from 'react';

import { useTemplateAdd } from '@/templates/hooks/useTemplateAdd';

const useAddTemplateHook = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isPending, ...mutation } = useTemplateAdd();

  const mutate = (input: Parameters<(typeof mutation)['mutate']>[0]) =>
    mutation.mutate(input, {
      onSuccess: () => {
        setIsOpen(false);
      },
    });

  return { isOpen, setIsOpen, isPending, mutate };
};

const ActionContext = createContext<
  ReturnType<typeof useAddTemplateHook> | undefined
>(undefined);

export const ActionProvider = (props: PropsWithChildren) => {
  const value = useAddTemplateHook();
  return (
    <ActionContext.Provider value={value}>
      {props.children}
    </ActionContext.Provider>
  );
};

export const useAction = () => {
  const value = useContext(ActionContext);
  if (!value) throw new Error('Add Templates Context not found as a Provider');
  return value;
};
