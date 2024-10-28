'use client';
import { FileCheck, TvMinimalPlay } from 'lucide-react';
import Link from 'next/link';

import { useUserData } from '@/applicant/hooks/useUserData';
import { Button } from '@/components/ui/button';

import ResumeCard from './DashboardResumeCard';
import RadialProgress from './RadialProgress';
import InterviewCard from './DashboardInterviewCard';

function UserLanding() {
  const { applicant_user, resume, analysis, interview } = useUserData();
  const { overallScore } = resume?.resume_feedback || {};

  const InterviewScore = [
    {
      name: 'Score',
      value: (analysis && analysis.structured_analysis?.overall_score) || 0,
      fill: '#8b5cf6',
      path: '#ddd6fe',
    },
  ];

  const ResumeScore = [
    {
      name: 'Score',
      value: overallScore ?? 0,
      fill: '#db2777',
      path: '#fbcfe8',
    },
  ];

  return (
    <div className='flex h-[85vh] overflow-auto flex-col items-center justify-center gap-10'>
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
      {interview?.interview_stage !== 'interview_completed' && (
        <div className='flex w-full items-center justify-between rounded-md border border-yellow-500 p-4 text-center'>
          <p className='font-bold text-yellow-500'>
            You have not completed your interview yet.
          </p>
          <Link
            className='text-blue-600'
            href={`/interview/${interview?.id}/start-interview`}
          >
            Start Now
          </Link>
        </div>
      )}
      <div className='grid w-full grid-cols-3 gap-4'>
        <div className='flex flex-col items-center gap-2 rounded-lg bg-purple-50 p-4'>
          <div className='mb-[-32px] mt-[10px] font-medium text-purple-600'>
            Interview Score
          </div>
          <RadialProgress chartData={InterviewScore} size={250} />
          <Link href={'/interview-feedback'} className='w-full'>
            <Button className='w-full'>View Detail</Button>
          </Link>
        </div>
        <div className='flex flex-col items-center gap-2 rounded-lg bg-pink-50 p-4'>
          <div className='mb-[-32px] mt-[10px] font-medium text-pink-600'>
            Resume Score
          </div>
          <RadialProgress chartData={ResumeScore} size={250} />
          <Link href={'/resume-review'} className='w-full'>
            <Button className='w-full'>View Detail</Button>
          </Link>
        </div>
        <div className='grid grid-cols-1 grid-rows-2 gap-4'>
          <div className='flex flex-col justify-between gap-2 rounded-lg bg-muted p-5'>
            <div className='flex flex-col gap-2'>
              <FileCheck
                className='h-8 w-8 text-muted-foreground'
                strokeWidth={1.5}
              />
              <div className='flex flex-col gap-1'>
                <span>Resume Submitted</span>
                {/* <span>
                  {resume?.created_at
                    ? new Date(resume.created_at).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'Date not available'}
                </span> */}
              </div>
            </div>
            <Link
              href='/profile/basic-information'
              className='flex items-center gap-2 text-sm text-blue-600'
            >
              <span>Edit Basic Information</span>
            </Link>
          </div>

          <div className='flex flex-col justify-between gap-2 rounded-lg bg-muted p-5'>
            <div className='flex flex-col gap-2'>
              <TvMinimalPlay
                className='h-8 w-8 text-muted-foreground'
                strokeWidth={1.5}
              />
              <div className='flex flex-col gap-0.5'>
                <span className='text-sm text-muted-foreground'>
                  {interview?.interview_stage === 'interview_completed'
                    ? 'Interview completed on,'
                    : 'You have an interview scheduled'}
                </span>
                {interview?.interview_stage === 'interview_completed' && (
                  <span className='text-sm'>
                    {interview?.updated_at
                      ? new Date(interview?.updated_at).toLocaleDateString(
                          'en-US',
                          {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          },
                        )
                      : 'Date not available'}
                  </span>
                )}
              </div>
            </div>
            {interview?.interview_stage === 'interview_completed' ? (
              <Link
                href='/interview-transcript'
                className='flex items-center gap-2 text-sm text-blue-600'
              >
                <span>Replay Interview</span>
              </Link>
            ) : (
              <Link
                href={`/interview/${interview?.id}/start-interview`}
                className='flex items-center gap-2 text-sm text-blue-600'
              >
                <span className='cursor-pointer'>Start now</span>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className='grid grid-cols-2 w-full gap-4'>
      <div className='flex flex-col gap-6'>
            <InterviewCard status='completed' interviewScore={InterviewScore}/>
            <InterviewCard status='analysing' interviewScore={InterviewScore}/>
            <InterviewCard status='start' interviewScore={InterviewScore}/>
        </div>
        <div className='flex flex-col gap-6'>
            <ResumeCard status='completed' resumeScore={ResumeScore}/>
            <ResumeCard status='inProgress'/>
            <ResumeCard status='reupload'/>
        </div>
        <div>

        </div>
      </div>
    </div>
  );
}

export default UserLanding;
