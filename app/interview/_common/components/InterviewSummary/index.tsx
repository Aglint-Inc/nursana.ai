'use client';

import { Calendar, Clock, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';
import { type InterviewData } from 'src/types/types';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

import Footer from '../../../../../components/footer';
import NursanaLogo from '../../../../../components/nursana-logo';

interface InterviewSummaryProps {
  interviewId: string;
  interviewData: InterviewData;
}

export default function InterviewSummary({
  interviewData,
}: InterviewSummaryProps) {
  const posthog = usePostHog();
  useEffect(() => {
    const hasCaptured = localStorage.getItem('stage_interview_summary');
    if (!hasCaptured) {
      posthog.capture('stage_interview_summary');
      localStorage.setItem('stage_interview_summary', 'true');
    }
  }, []);

  const router = useRouter();

  return (
    <div className='flex flex-col items-center'>
      <div className='flex h-[calc(100vh-72px)] flex-col items-center pt-10'>
        <div className=''>
          <NursanaLogo />
        </div>
        <div className='mb-1 flex text-center text-2xl font-medium'>
          <span>Interview completed successfully 🎉</span>
        </div>
        <p className='mb-6 max-w-2xl text-center text-muted-foreground'>
          Review all the important details and outcomes from your interview on
          the dashboard. Get insights, resume feedback, and next steps to help
          you move forward confidently.
        </p>
        <Card className='w-full bg-secondary'>
          <CardContent className='p-4'>
            <h2 className='text-lf mb-2 font-medium'>{interviewData.name}</h2>
            <div className='flex items-center gap-4'>
              <div className='flex items-center text-gray-600'>
                <Clock className='mr-2 h-5 w-5' />
                <span>{interviewData.candidate_estimated_time}</span>
              </div>
              <div className='flex items-center text-gray-600'>
                <Calendar className='mr-2 h-5 w-5' />
                <span>{new Date(Date.now()).toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className='hidden items-center space-x-4 border-t pt-4'>
            <div className='flex items-center space-x-2 text-gray-600'>
              <FileText className='h-5 w-5' />
              <div>
                <p className='text-sm font-medium'>
                  {interviewData.candidate_intro_video_url}
                </p>
                <p className='text-xs'>
                  {interviewData.candidate_intro_video_cover_image_url}
                </p>
              </div>
            </div>
            <Button
              variant='link'
              className='ml-auto text-blue-600 hover:text-blue-800'
            >
              view resume
            </Button>
          </CardFooter>
        </Card>
        <div className='mt-8 text-center'>
          <Button
            className='w-full'
            size='lg'
            onClick={() => {
              router.push(`/dashboard`);
            }}
          >
            View My Dashboard
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
