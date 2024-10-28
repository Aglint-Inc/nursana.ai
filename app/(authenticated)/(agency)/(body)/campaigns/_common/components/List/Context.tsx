import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from 'react';

const useListContext = () => {
  const [search, setSearch] = useState<string>('');
  return {
    search,
    setSearch,
  };
};

const ListContext = createContext<
  ReturnType<typeof useListContext> | undefined
>(undefined);

export const ListProvider = (props: PropsWithChildren) => {
  const value = useListContext();
  return (
    <ListContext.Provider value={value}>{props.children}</ListContext.Provider>
  );
};

export const useList = () => {
  const value = useContext(ListContext);
  if (!value) throw new Error('List Context not found as a Provider');
  return value;
};
