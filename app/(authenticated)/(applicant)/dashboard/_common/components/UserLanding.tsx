'use client';
import { FileCheck, TvMinimalPlay } from 'lucide-react';
import Link from 'next/link';

import { useUserData } from '@/applicant/hooks/useUserData';
import { Button } from '@/components/ui/button';
import { type Database } from '@/supabase-types/database.types';

import ProgressSteps from './ProgressSteps';
import RadialProgress from './RadialProgress';
import {
  UserLandingProps,
  InterviewHomeUI,
} from '@/authenticated/components/InterviewHomeUI';

type ScoreType = {
  name: string;
  value: any;
  fill: string;
  path: string;
};

function UserLanding() {
  const {
    applicant_user,
    resume,
    analysis,
    interview: interviewData,
  } = useUserData();
  const { overallScore } = resume?.resume_feedback || {};

  const interviewScore =
    (analysis && analysis.structured_analysis?.overall_score) || 0;
  const resumeScore = resume?.resume_feedback?.overallScore || 0;

  const InterviewScore: ScoreType[] = [
    {
      name: 'Score',
      value: interviewScore,
      fill: '#8b5cf6',
      path: '#ddd6fe',
    },
  ];

  const ResumeScore: ScoreType[] = [
    {
      name: 'Score',
      value: resumeScore,
      fill: '#db2777',
      path: '#fbcfe8',
    },
  ];

  const interview: UserLandingProps['interview'] = {
    id: interviewData?.id || '',
    stage: interviewData?.interview_stage || '',
    updated_at: interviewData?.updated_at || '',
  };

  return (
    <InterviewHomeUI
      InterviewScore={InterviewScore}
      ResumeScore={ResumeScore}
      first_name={applicant_user?.user.first_name}
      interview={interview}
    />
  );
}

export default UserLanding;
