'use client';
import axios from 'axios';
import { Sparkles, TvMinimalPlay } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Loader } from '@/app/components/Loader';
import { useUserData, useUserDataQuery } from '@/applicant/hooks/useUserData';
import { InterviewAnalysisUI } from '@/authenticated/components/InterviewAnalysisUI';
import { Button } from '@/components/ui/button';

import NotAvailable from './NotAvailable';

export function InterviewAnalysis() {
  const { analysis, interview } = useUserData();

  const { refetch } = useUserDataQuery();
  const interviewAnalysis = analysis?.structured_analysis;
  const interviewDetails = interview.interview_stage;
  const [ignoreRefetching, setIgnoreRefetching] = useState<boolean>(false);

  const [interviewFeedbackFetching, setInterviewFeedbackFetching] =
    useState<boolean>(false);
  async function fetchInterviewFeedback() {
    setInterviewFeedbackFetching(true);
    await axios.post('/api/score_call', {
      analysis_id: analysis?.id,
      transcript_json: analysis?.transcript_json,
    });
    setInterviewFeedbackFetching(false);
    refetch();
  }
  useEffect(() => {
    const interval = setInterval(() => {
      if (interviewAnalysis) {
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
  }, [interviewDetails]);

  if (interview.interview_stage !== 'interview_completed') {
    return (
      <NotAvailable
        heading='Your interview hasn’t been completed yet.'
        description='Please complete your interview to access your analysis.'
        Icon={TvMinimalPlay}
        actionBtn={
          <Button>
            <Link href={`/interview/${interview.id}/start-interview`}>
              Start Interview
            </Link>
          </Button>
        }
      />
    );
  }

  if (!interviewAnalysis && !ignoreRefetching) {
    return (
      <NotAvailable
        heading='Unable to fetch analysis'
        description='Please check back in a little while for updated information.'
        Icon={Sparkles}
        actionBtn={
          <Button onClick={fetchInterviewFeedback}>
            {interviewFeedbackFetching && <Loader />}
            {interviewFeedbackFetching ? 'Please wait...' : 'Try Again'}
          </Button>
        }
      />
    );
  }

  if (!interviewAnalysis) {
    return (
      <NotAvailable
        heading='Data temporarily unavailable'
        description='We’re currently analyzing the data. Please check back in a little while for updated information.'
        Icon={Sparkles}
        actionBtn={<Button>Try Again</Button>}
      />
    );
  }

  return (
    <InterviewAnalysisUI isCandidateView={true} analysis={interviewAnalysis} />
  );
}
