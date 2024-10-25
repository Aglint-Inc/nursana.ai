'use client';
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { api } from 'trpc/client';

import { type Edit } from '../api/edit';

const useAgencyEditMutate = () => {
  const mutation = api.authenticated.agency.edit.useMutation();
  const mutate = (
    input: Omit<Edit['input'], 'id'>,
    mutationOptions?: Parameters<(typeof mutation)['mutate']>[1],
  ) => mutation.mutate({ ...input }, mutationOptions);
  return { ...mutation, mutate };
};

const useAgencyEditContext = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending } = useAgencyEditMutate();

  return {
    isOpen,
    setIsOpen,
    mutate,
    isPending,
  };
};

const EditAgencyContext = createContext<
  ReturnType<typeof useAgencyEditContext> | undefined
>(undefined);

export const AgencyEditProvider = (props: PropsWithChildren) => {
  const value = useAgencyEditContext();
  return (
    <EditAgencyContext.Provider value={value}>
      {props.children}
    </EditAgencyContext.Provider>
  );
};

export const useAgencyEdit = () => {
  const value = useContext(EditAgencyContext);
  if (!value) throw new Error('Agency edit Context not found as a Provider');
  return value;
};
