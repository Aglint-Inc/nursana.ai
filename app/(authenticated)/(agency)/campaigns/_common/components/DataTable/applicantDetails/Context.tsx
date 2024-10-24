import React, { createContext, useContext, useState } from 'react';
import { api } from 'trpc/client';

const useApplicantHook = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [applicantId, setApplicantId] = useState('');
  const { data, isLoading } =
    api.authenticated.agency.campaigns.get_applicant_detail.useQuery(
      {
        applicant_id: applicantId,
      },
      { enabled: !!applicantId },
    );
  return {
    isOpen,
    setIsOpen,
    applicantId,
    setApplicantId,
    data: data!,
    isLoading,
  };
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
