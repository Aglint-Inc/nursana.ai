import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

const useApplicantHook = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [applicantId, setApplicantId] = useState('');

  return { isOpen, setIsOpen, applicantId, setApplicantId };
};

const ApplicationContext = createContext<
  ReturnType<typeof useApplicantHook> | undefined
>(undefined);

export const ApplicantDetailProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const value = useApplicantHook();
  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicantDetail = () => {
  const context = useContext(ApplicationContext);
  if (!context) throw new Error('applicant context not available as provider');
  return context;
};
