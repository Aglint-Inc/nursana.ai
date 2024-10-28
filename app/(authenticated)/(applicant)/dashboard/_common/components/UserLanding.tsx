'use client';

import { useUserData } from '@/applicant/hooks/useUserData';

import InterviewCard from './DashboardInterviewCard';
import ResumeCard from './DashboardResumeCard';

function UserLanding() {
  const { applicant_user, resume, analysis, interview } = useUserData();

  return (
    <div className='flex h-[85vh] flex-col items-center justify-center gap-10'>
      <div className='flex flex-col items-center gap-2'>
        <div className='flex items-center gap-2 text-center text-3xl font-medium'>
          <div className='text-purple-700'>
            {' '}
            Hello {applicant_user?.user.first_name || 'Nurse'} 👋,
          </div>
          <div>Welcome to Nursana 💜</div>
        </div>
        <p className='text-center text-muted-foreground'>
          {' '}
          Keep your profile up to date, collect valuable feedback on your resume
          and interview responses, and stay tuned for the perfect job
          opportunity coming your way.
        </p>
      </div>

      <div className='grid w-full grid-cols-2 gap-4'>
        <ResumeCard resumeDetails={resume} />
        <InterviewCard analysis={analysis} interviewDetails={interview} />
      </div>
    </div>
  );
}

export default UserLanding;
