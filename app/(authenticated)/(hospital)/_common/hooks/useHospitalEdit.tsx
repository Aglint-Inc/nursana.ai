'use client';
import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from 'react';
import { api } from 'trpc/client';

import { type Edit } from '../api/edit';

const useHospitalEditMutate = () => {
  const mutation = api.authenticated.hospital.edit.useMutation();
  const mutate = (
    input: Omit<Edit['input'], 'id'>,
    mutationOptions?: Parameters<(typeof mutation)['mutate']>[1],
  ) => mutation.mutate({ ...input }, mutationOptions);
  return { ...mutation, mutate };
};

const useHospitalEditContext = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isPending } = useHospitalEditMutate();

  return {
    isOpen,
    setIsOpen,
    mutate,
    isPending,
  };
};

const EditHospitalContext = createContext<
  ReturnType<typeof useHospitalEditContext> | undefined
>(undefined);

export const HospitalEditProvider = (props: PropsWithChildren) => {
  const value = useHospitalEditContext();
  return (
    <EditHospitalContext.Provider value={value}>
      {props.children}
    </EditHospitalContext.Provider>
  );
};

export const useHospitalEdit = () => {
  const value = useContext(EditHospitalContext);
  if (!value) throw new Error('Hospital edit Context not found as a Provider');
  return value;
};
