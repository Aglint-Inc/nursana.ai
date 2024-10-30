import axios from 'axios';
import { TriangleAlert, TvMinimalPlay } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { Loader } from '@/app/components/Loader';
import { useUserDataQuery } from '@/applicant/hooks/useUserData';
import { Button } from '@/components/ui/button';
import { type DBTable } from '@/server/db/types';

import RadialProgress from './RadialProgress';
type ResumeCardProps = {
  interviewDetails: DBTable<'interview'> | null;
  analysis: DBTable<'interview_analysis'> | null;
};

function InterviewCard({ interviewDetails, analysis }: ResumeCardProps) {
  const { refetch } = useUserDataQuery();

  const interviewScore = analysis?.structured_analysis?.overall_score || 0;
  const interviewAnalysis = analysis?.structured_analysis;
  const [interviewFeedbackFetching, setInterviewFeedbackFetching] =
    useState<boolean>(false);

  const [ignoreRefetching, setIgnoreRefetching] = useState<boolean>(false);

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

  return (
    <>
      {interviewDetails?.interview_stage !== 'interview_completed' ? (
        <div className='w-full rounded-lg border border-border p-6'>
          <div className='grid grid-cols-1'>
            <div className='flex h-full min-h-[230px] flex-col justify-between gap-4'>
              <div className='flex flex-col gap-2'>
                <div className='flex h-14 w-14 items-center justify-center rounded-lg bg-purple-50'>
                  <TvMinimalPlay
                    className='h-8 w-8 text-purple-600'
                    strokeWidth={1.4}
                  />
                </div>
                <p className='text-lg font-medium'>Take Your Interview Now.</p>
                <p className='text-muted-foreground'>
                  Please start the interview to receive feedback and a score,
                  which will help you match with the perfect job.{' '}
                </p>
              </div>
              <Link
                href={`/interview/${interviewDetails?.id}/start-interview`}
                className='w-full'
              >
                <Button className='w-full'>Take Interview</Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          {interviewAnalysis &&
            interviewDetails?.interview_stage === 'interview_completed' && (
              <CompletedInterviewCard interviewScore={interviewScore} />
            )}

          {((!interviewAnalysis && !ignoreRefetching) ||
            interviewFeedbackFetching) && (
            <div className='w-full rounded-lg border border-border p-6'>
              <div className='grid grid-cols-1'>
                <div className='flex h-full min-h-[230px] flex-col justify-between gap-4'>
                  <div className='flex flex-col gap-2'>
                    <div className='flex h-14 w-14 items-center justify-center rounded-lg bg-blue-50'>
                      <Loader size={20} className='text-blue-600' />
                    </div>
                    <p className='text-lg font-medium'>Analysing Interview..</p>
                    <p className='text-muted-foreground'>
                      We are analyzing your interview now. Please check back
                      shortly to view your interview score and feedback.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!interviewFeedbackFetching &&
            ignoreRefetching &&
            !interviewAnalysis && (
              <div className='w-full rounded-lg border border-border p-6'>
                <div className='grid grid-cols-1'>
                  <div className='flex h-full min-h-[230px] flex-col justify-between gap-4'>
                    <div className='flex flex-col gap-2'>
                      <div className='flex h-14 w-14 items-center justify-center rounded-lg bg-red-50'>
                        <TriangleAlert
                          className='h-8 w-8 text-red-600'
                          strokeWidth={1.4}
                        />
                      </div>
                      <p className='text-lg font-medium'>
                        Unable to load interview details
                      </p>

                      <p className='text-muted-foreground'>
                        Something went wrong. Please try again later.
                      </p>
                    </div>
                    <Button onClick={fetchInterviewFeedback}>Try again</Button>
                  </div>
                </div>
              </div>
            )}
        </>
      )}
    </>
  );
}

export default InterviewCard;

export function CompletedInterviewCard({
  interviewScore,
}: {
  interviewScore: number;
}) {
  const interviewCartData = [
    {
      name: 'Score',
      value: interviewScore,
      fill: '#8b5cf6',
      path: '#ddd6fe',
    },
  ];
  return (
    <div className='flex min-h-[230px] w-full flex-col justify-between gap-8 rounded-lg border border-border p-6'>
      <div className='grid grid-cols-2'>
        <div className='flex h-full flex-col justify-between'>
          <div className='flex flex-col gap-2'>
            <div className='flex h-14 w-14 items-center justify-center rounded-lg bg-green-100'>
              <TvMinimalPlay
                className='h-8 w-8 text-green-600'
                strokeWidth={1.4}
              />
            </div>
            <p className='text-lg font-medium'>Interview Completed</p>
          </div>
        </div>

        <div className='relative'>
          <div className='absolute left-[-10px] top-[-40px]'>
            <RadialProgress chartData={interviewCartData} size={200} />
          </div>
        </div>
      </div>
      <Link href={'/interview-feedback'} className='w-full'>
        <Button className='w-full'>View Detail</Button>
      </Link>
    </div>
  );
}
