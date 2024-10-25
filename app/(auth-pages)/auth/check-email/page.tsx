'use client';

import { MailCheck } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import Footer from '@/components/footer';
import NursanaLogo from '@/components/nursana-logo';
import Section from '@/components/section';
import { Button } from '@/components/ui/button';
import { useLocalStorage } from '@/hooks/use-local-storage';

export default function CheckEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const type = searchParams.get('type') as string;
  const email = searchParams.get('email') as string;

  const [interviewRatingRound, setInterviewRatingRound] = useLocalStorage<{
    firstRound: boolean;
    secondRound: boolean;
    counter: number;
  }>('interview-rating-round', {
    firstRound: false,
    secondRound: false,
    counter: 0,
  });
  function interviewRatingOpenCountHandler() {
    if (interviewRatingRound.counter <= 2) {
      setInterviewRatingRound({
        firstRound: false,
        secondRound: true,
        counter: 2,
      });
    } else {
      setInterviewRatingRound({
        firstRound: false,
        secondRound: false,
        counter: 3,
      });
    }
  }

  useEffect(() => {
    interviewRatingOpenCountHandler(); // count for open user interview feedback rating form
  }, []);
  return (
    <Section>
      <div className='flex h-[100vh] flex-col items-center justify-between pt-6'>
        <NursanaLogo />
        <div className='flex max-w-[450px] flex-col items-center justify-center px-4'>
          <MailCheck
            size={60}
            strokeWidth={1.2}
            className='mb-4 text-purple-600'
          />
          <h1 className='mb-4 text-2xl font-medium'>Check Your Inbox</h1>
          <p className='mb-1 text-center'>
            {type === 'interview'
              ? `We've sent an interview link to ${email.replaceAll(' ', '+')}. Click the link to start your interview.`
              : `We've sent a login link to ${email.replaceAll(' ', '+')}.`}
          </p>
          <p className='mb-8 text-sm text-muted-foreground'>
            {`If you don't see the email, check your spam folder.`}
          </p>
          <Button onClick={() => router.push('/')}>Back to Home Page</Button>
        </div>
        <Footer />
      </div>
    </Section>
  );
}
