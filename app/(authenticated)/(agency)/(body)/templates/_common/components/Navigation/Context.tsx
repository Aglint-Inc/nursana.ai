import {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
} from 'react';

const useNavigationContext = () => {
  const [search, setSearch] = useState<string>('');
  return {
    search,
    setSearch,
  };
};

const NavigationContext = createContext<
  ReturnType<typeof useNavigationContext> | undefined
>(undefined);

export const NavigationProvider = (props: PropsWithChildren) => {
  const value = useNavigationContext();
  return (
    <NavigationContext.Provider value={value}>
      {props.children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const value = useContext(NavigationContext);
  if (!value) throw new Error('NavigationContext not found as a Provider');
  return value;
};
