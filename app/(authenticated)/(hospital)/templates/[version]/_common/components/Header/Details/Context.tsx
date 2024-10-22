import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from 'react';

import { useVersionEdit } from '../../../hooks/userVersionEdit';

const useVersionContext = () => {
  const [mode, setMode] = useState<'edit' | 'view'>('view');
  const { mutate, isPending } = useVersionEdit();
  return {
    mode,
    setMode,
    mutate,
    isPending,
  };
};

const VersionContext = createContext<
  ReturnType<typeof useVersionContext> | undefined
>(undefined);

export const DetailsProvider = (props: PropsWithChildren) => {
  const value = useVersionContext();
  return (
    <VersionContext.Provider value={value}>
      {props.children}
    </VersionContext.Provider>
  );
};

export const useDetails = () => {
  const value = useContext(VersionContext);
  if (!value) throw new Error('Version Context not found as a Provider');
  return value;
};
