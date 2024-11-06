'use client';

import { useUserData } from '@/applicant/hooks/useUserData';

import InterviewCard from './DashboardInterviewCard';
import ResumeCard from './DashboardResumeCard';

function UserLanding() {
  const { applicant_user, resume, analysis, interview } = useUserData();

  return (
    <div className='flex lg:min-h-[85vh] flex-col lg:items-center justify-center gap-10  max-lg:py-5 lg:container'>
      <div className='flex flex-col lg:items-center gap-2 '>
        <div className='flex max-lg:flex-col lg:items-center lg:gap-2 gap-0 lg:text-center lg:text-3xl text-xl font-medium'>
          <div className='text-purple-700'>
            {' '}
            Hello {applicant_user?.user.first_name || 'Nurse'} 👋,
          </div>
          <div>Welcome to Nursana 💜</div>
        </div>
        <p className='lg:text-center text-muted-foreground'>
          {' '}
          Keep your profile up to date, collect valuable feedback on your resume
          and interview responses, and stay tuned for the perfect job
          opportunity coming your way.
        </p>
      </div>

      <div className='grid md:grid-cols-2 w-full  gap-4'>
        <ResumeCard resumeDetails={resume} />
        <InterviewCard analysis={analysis} interviewDetails={interview} />
      </div>
    </div>
  );
}

export default UserLanding;
