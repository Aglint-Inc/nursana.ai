'use client';
import { AlertCircle, Terminal } from 'lucide-react';
import Link from 'next/link';

import { useUserData } from '@/applicant/hooks/useUserData';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

export function DashboardCTA() {
  const userData = useUserData();

  if (!userData) return null; // Return null if data is not available

  const user = userData.user;
  const resume = userData.resume;

  // Check if profile is complete
  const isProfileComplete =
    user?.first_name &&
    user?.last_name &&
    user?.email &&
    resume?.file_url &&
    (user?.preferred_job_titles ?? []).length > 0 &&
    (user?.preferred_locations ?? []).length > 0 &&
    user?.job_type &&
    user?.travel_preference &&
    user?.expected_salary;

  const hasCompletedInterview =
    userData.interview?.interview_stage ?? null === 'interview_completed';
  const hasAnyInterview = userData.interview?.interview_stage ?? null !== null;

  return (
    <div className='my-4 space-y-4'>
      {/* {!false && ( */}
      {!hasCompletedInterview && (
        <Alert>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>
            {hasAnyInterview ? 'Interview In Progress' : 'Start Your Interview'}
          </AlertTitle>
          <AlertDescription>
            <div className='flex flex-col justify-between gap-4'>
              {hasAnyInterview
                ? 'You have an ongoing interview. Continue to complete it and receive your feedback.'
                : 'Start your first interview to get personalized feedback and improve your chances of landing your dream job.'}
              <Button variant='default' asChild>
                <Link
                  href={
                    hasAnyInterview ? '/interview/continue' : '/interview/start'
                  }
                >
                  {hasAnyInterview
                    ? 'Continue Your Interview'
                    : 'Start Your First Interview'}
                </Link>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
      {/* {!true && ( */}
      {!isProfileComplete && (
        <Alert>
          <Terminal className='h-4 w-4' />
          <AlertTitle>Profile Incomplete</AlertTitle>
          <AlertDescription>
            <div className='flex flex-col gap-4'>
              <p>
                Your profile is not complete. Please provide all necessary
                information to get the most out of our platform.
              </p>
              <Button variant='default' className='w-fit' asChild>
                <Link href='/profile'>Complete Profile</Link>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
