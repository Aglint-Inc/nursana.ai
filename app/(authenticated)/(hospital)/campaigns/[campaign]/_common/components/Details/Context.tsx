import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from 'react';

const useDetailsContext = () => {
  const [mode, setMode] = useState<'edit' | 'view'>('view');
  return {
    mode,
    setMode,
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
