'use client';
import { Sparkles } from 'lucide-react';

import { useUserData } from '@/applicant/hooks/useUserData';
import { InterviewAnalysisUI } from '@/authenticated/components/InterviewAnalysisUI';

import NotAvailable from './NotAvailable';

export function InterviewAnalysis() {
  const userData = useUserData();
  const analysis = userData?.analysis?.structured_analysis;

  if (!analysis) {
    return (
      <NotAvailable
        heading='Data temporarily unavailable'
        description='We’re currently analyzing the data. Please check back in a little while for updated information.'
        Icon={Sparkles}
      />
    );
  }

  return (
    <InterviewAnalysisUI
      summary={analysis?.overall_feedback || ' - '}
      analysis={analysis}
    />
  );
}
