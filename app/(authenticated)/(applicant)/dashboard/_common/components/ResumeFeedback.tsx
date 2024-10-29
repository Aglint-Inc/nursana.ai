'use client';

import { useUserData } from '@/applicant/hooks/useUserData';
import { ResumeFeedbackUI } from '@/authenticated/components/ResumeFeedbackUI';

export interface FeedbackData {
  summary: string;
  breakdown: {
    experience: {
      feedback: string;
      specialties: { rating: number; comments: string };
      suggestions: string;
      leadership_roles: { rating: number; comments: string };
      healthcare_settings: { rating: number; comments: string };
      years_of_experience: { rating: number; comments: string };
    };
    education_and_certifications: {
      degree: { rating: number; comments: string };
      feedback: string;
      suggestions: string;
      certifications: { rating: number; comments: string };
      specializations: { rating: number; comments: string };
    };
  };
  overallScore: number;
}

export function ResumeFeedback() {
  const { resume } = useUserData();

  return (
    <ResumeFeedbackUI
      resume={resume}
      summary={resume.resume_feedback?.summary}
    />
  );
}
