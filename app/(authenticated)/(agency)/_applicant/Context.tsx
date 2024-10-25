// @ts-nocheck
import React, { createContext, useContext, useState } from 'react';
import { api } from 'trpc/client';

const useApplicantHook = () => {
  const [applicantId, setApplicantId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<string | null>(null);
  const { data, isLoading } =
    api.authenticated.agency.campaigns.get_applicant_detail.useQuery(
      {
        applicant_id: applicantId as string,
      },
      { enabled: !!applicantId },
    );
  return {
    applicantId,
    setApplicantId,
    data: data!,
    isLoading,
    isOpen,
    setIsOpen,
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

export const useApplicant = () => {
  const context = useContext(ApplicationContext);
  if (!context) throw new Error('applicant context not available as provider');
  return context;
};
