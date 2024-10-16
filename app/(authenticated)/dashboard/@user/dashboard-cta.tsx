'use client';
import Link from 'next/link';
import { useNurseData } from '@/common/hooks/useNurseData';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, AlertCircle } from 'lucide-react';

export function DashboardCTA() {
  const { nurseData } = useNurseData();

  if (!nurseData) return null; // Return null if data is not available

  const user = nurseData.nurse;
  const resume = nurseData.resume;

  // Check if profile is complete
  const isProfileComplete =
    user?.first_name &&
    user?.last_name &&
    user?.email &&
    resume?.file_url &&
    user?.preferred_job_titles?.length > 0 &&
    user?.preferred_locations?.length > 0 &&
    user?.job_type &&
    user?.travel_preference &&
    user?.expected_salary;

  const interviews = nurseData.interview || [];
  const hasCompletedInterview = interviews.some(
    (interview) => interview.interview_stage === 'completed',
  );
  const hasAnyInterview = interviews.length > 0;

  return (
    <div className='my-4 space-y-4'>
      {!hasCompletedInterview && (
        <Alert>
          <AlertCircle className='h-4 w-4' />
          <AlertTitle>
            {hasAnyInterview ? 'Interview In Progress' : 'Start Your Interview'}
          </AlertTitle>
          <AlertDescription>
            <div className='flex flex-row justify-between space-x-4'>
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

      {!isProfileComplete && (
        <Alert>
          <Terminal className='h-4 w-4' />
          <AlertTitle>Profile Incomplete</AlertTitle>
          <AlertDescription>
            <div className='flex flex-row justify-between space-x-4'>
              <p>
                Your profile is not complete. Please provide all necessary
                information to get the most out of our platform.
              </p>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
