import { Loader } from '@/common/components/Loader';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useApplicantDetail } from './Context';
import { Home } from './Home';
import { InterviewReview } from './InterviewReview';
import { InterviewTranscript } from './InterviewTranscript';
import { ResumeFeedback } from './ResumeFeedback';

export const ApplicationDetailsDrawer = () => {
  const { isOpen, setIsOpen, data, isLoading } = useApplicantDetail();
  return (
    <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Applicant</DrawerTitle>
          <DrawerDescription className='min-h-[600px]'>
            <Content />
          </DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

const Content = () => {
  const { isOpen, setIsOpen, data, isLoading } = useApplicantDetail();
  const [tab, setTab] = useState<
    'home' | 'interview_review' | 'interview_transcript' | 'resume_feedback'
  >('home');
  const { push } = useRouter();
  if (isLoading) return <Loader />;
  return (
    <div className='flex h-full w-full gap-2'>
      <div className='flex w-fit flex-col gap-2'>
        <Button
          variant={'secondary'}
          className={`${tab === 'home' ? 'bg-gray-300 hover:bg-gray-300' : ''}`}
          onClick={() => setTab('home')}
        >
          Home
        </Button>
        <Button
          variant={'secondary'}
          className={`${tab === 'interview_review' ? 'bg-gray-300 hover:bg-gray-300' : ''}`}
          onClick={() => setTab('interview_review')}
        >
          Interview Review
        </Button>
        <Button
          variant={'secondary'}
          className={`${tab === 'interview_transcript' ? 'bg-gray-300 hover:bg-gray-300' : ''}`}
          onClick={() => setTab('interview_transcript')}
        >
          Interview Transcript
        </Button>
        <Button
          variant={'secondary'}
          className={`${tab === 'resume_feedback' ? 'bg-gray-300 hover:bg-gray-300' : ''}`}
          onClick={() => setTab('resume_feedback')}
        >
          Resume Feedback
        </Button>
      </div>
      <div className='h-full w-full bg-gray-50'>
        {tab === 'home' && <Home />}
        {tab === 'interview_review' && <InterviewReview />}
        {tab === 'interview_transcript' && <InterviewTranscript />}
        {tab === 'resume_feedback' && <ResumeFeedback />}
      </div>
    </div>
  );
};
