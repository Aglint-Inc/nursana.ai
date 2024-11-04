import { createContext, type PropsWithChildren, useContext } from 'react';

type Props = {
  intercepted?: boolean;
};

const Navigation = createContext<Props | undefined>(undefined);

export const NaivgationProvider = ({
  intercepted = false,
  ...props
}: PropsWithChildren<Props>) => {
  return (
    <Navigation.Provider value={{ intercepted, ...props }}>
      {props.children}
    </Navigation.Provider>
  );
};

export const useNavigation = () => {
  const value = useContext(Navigation);
  if (!value) throw new Error('NavigationContext not found as a Provider');
  return value;
};
