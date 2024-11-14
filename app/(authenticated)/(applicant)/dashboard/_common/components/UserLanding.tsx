'use client';

import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';

import { useUserData } from '@/applicant/hooks/useUserData';

import InterviewCard from './DashboardInterviewCard';
import ResumeCard from './DashboardResumeCard';

function UserLanding() {
  const posthog = usePostHog();

  const { applicant_user, resume, analysis, interview } = useUserData();

  useEffect(() => {
    if (applicant_user) {
      posthog.capture('dashboard', {
        email: applicant_user.user.email,
      });
    }
  }, [applicant_user]);

  return (
    <div className='flex flex-col justify-center gap-10 lg:container max-lg:py-5 lg:min-h-[85vh] lg:items-center'>
      <div className='flex flex-col gap-2 lg:items-center'>
        <div className='flex gap-0 text-xl font-medium max-lg:flex-col lg:items-center lg:gap-2 lg:text-center lg:text-3xl'>
          <div className='text-purple-700'>
            {' '}
            Hello {applicant_user?.user.first_name || 'Nurse'} 👋,
          </div>
          <div>Welcome to Nursana 💜</div>
        </div>
        <p className='text-muted-foreground lg:text-center'>
          {' '}
          Keep your profile up to date, collect valuable feedback on your resume
          and interview responses, and stay tuned for the perfect job
          opportunity coming your way.
        </p>
      </div>

      <div className='grid w-full gap-4 md:grid-cols-2'>
        <ResumeCard resumeDetails={resume} />
        <InterviewCard analysis={analysis} interviewDetails={interview} />
      </div>
    </div>
  );
}

export default UserLanding;
