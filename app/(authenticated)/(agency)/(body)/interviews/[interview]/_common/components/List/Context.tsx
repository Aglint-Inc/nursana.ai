import { createContext, type PropsWithChildren, useContext } from 'react';

type Props = {
  intercepted?: boolean;
};

const ListContext = createContext<Props | undefined>(undefined);

export const ListProvider = ({
  intercepted = false,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <ListContext.Provider value={{ intercepted, ...props }}>
      {props.children}
    </ListContext.Provider>
  );
};

export const useList = () => {
  const value = useContext(ListContext);
  if (!value) throw new Error('List Context not found as a Provider');
  return value;
};
