'use client';

import axios from 'axios';
import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Loader } from '@/app/components/Loader';
import { useUserData, useUserDataQuery } from '@/applicant/hooks/useUserData';
import { ResumeFeedbackUI } from '@/authenticated/components/ResumeFeedbackUI';
import { Button } from '@/components/ui/button';
import { useBucket } from '@/hooks/use-bucket';

import NotAvailable from './NotAvailable';

export type FeedbackData = {
  professional_summary: AchievementsAndMetrics;
  experience_relevance_and_clarity: AchievementsAndMetrics;
  skills_and_keywords: AchievementsAndMetrics;
  achievements_and_metrics: AchievementsAndMetrics;
  education: AchievementsAndMetrics;
  grammar_and_language: AchievementsAndMetrics;
  overall_feedback: string;
  overall_comment: string;
  overall_score: number;
};

export type AchievementsAndMetrics = {
  score: number;
  comment: string;
  feedback: string;
};

export function ResumeFeedback() {
  const { resume } = useUserData();
  const { refetch, isPending: isUserDetailsFetching } = useUserDataQuery();

  const file_url = resume?.file_url || '';

  const resumeBucketName = 'resumes';
  const fileName = file_url?.split(`${resumeBucketName}/`).pop() ?? '';
  const { data: resumeUrl } = useBucket(resumeBucketName, fileName);

  const [resumeAnalyzing, setResumeAnalyzing] = useState(false);
  const [ignoreRefetching, setIgnoreRefetching] = useState(false);

  async function resumeAnalysisRefetch() {
    if (resume) {
      setResumeAnalyzing(true);
      await axios.post('/api/dynamic_resume_score', {
        resume_id: resume?.id,
        resume_json: resume?.structured_resume,
      });
      setResumeAnalyzing(false);
      refetch();
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (resume?.resume_feedback) {
        clearInterval(interval);
        setIgnoreRefetching(true);
      } else {
        refetch();
      }
    }, 5000);
    setTimeout(() => {
      clearInterval(interval);
      setIgnoreRefetching(true);
    }, 30000);
    return () => clearInterval(interval);
  }, [resume]);

  if (
    (!resume.resume_feedback && !ignoreRefetching) ||
    resumeAnalyzing ||
    isUserDetailsFetching
  ) {
    return (
      <NotAvailable
        heading='We are fetching your resume feedback.'
        description='Please wait a moment, or check back in a little while for updated information.'
        Icon={Sparkles}
        loading={true}
      />
    );
  }

  if (!resume.resume_feedback && ignoreRefetching && !resumeAnalyzing) {
    return (
      <NotAvailable
        heading='Unable to fetch resume feedback.'
        description='Please check back in a little while for updated information.'
        Icon={Sparkles}
        actionBtn={
          <Button onClick={resumeAnalysisRefetch}>
            {resumeAnalyzing && <Loader />}
            {resumeAnalyzing ? 'Please wait...' : 'Try Again'}
          </Button>
        }
      />
    );
  }

  return (
    <>
      <ResumeFeedbackUI
        resume={resume}
        isCandidateView={true}
        resumeUrl={resumeUrl ?? ''}
      />
    </>
  );
}
