import Image from 'next/image';

import { useUserData } from '@/authenicated/hooks/useUserData';
import { InterviewAnalysis } from '@/common/components/InterviewAnalysis';
import { InterviewTranscript } from '@/common/components/InterviewTranscript';
import { Loader } from '@/common/components/Loader';
import { ResumeReview } from '@/common/components/ResumeReview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import UserLanding from './UserLanding';


function LeftSection() {
  const userData = useUserData();
  return (
    <div className='flex flex-col gap-20 py-10'>
      
      <UserLanding/>

      {userData?.analysis?.structured_analysis ? (
        <InterviewAnalysis />
      ) : (
        <div className='flex h-[calc(100vh-164px)] w-full flex-col items-center justify-center gap-2 rounded-lg border border-gray-200'>
          <Image
            alt='interview analysis'
            src={'/images/interview-analysis.png'}
            width={200}
            height={100}
          />
          <div className='flex flex-col items-center justify-center gap-2'>
            <div className='grid grid-cols-[max-content_1fr] gap-2'>
              <Loader />
              <p className=''>Interview analysis is not yet complete.</p>
            </div>
            <p className='text-sm text-muted-foreground'>
              Please wait while we analyze your resume and provide the best
              possible recommendations.
            </p>
          </div>
        </div>
      )}

{userData?.resume?.structured_resume ? (
        <ResumeReview />
      ) : (
        <p>No resume feedback available.</p>
      )}

      {userData?.analysis?.transcript_json ? (
        <InterviewTranscript />
      ) : (
        <div className='flex h-[calc(100vh-164px)] w-full flex-col items-center justify-center gap-2 rounded-lg border border-gray-200'>
          <div className='grid grid-cols-[max-content_1fr] gap-2'>
            <Loader />
            <p className=''>Loading interview transcript.</p>
          </div>
        </div>
      )}
      <Tabs defaultValue='interview'>
        <TabsList className='mb-4'>
          <TabsTrigger value='interview'>Interview Feedback</TabsTrigger>
          <TabsTrigger value='resume'>Resume Review</TabsTrigger>
          <TabsTrigger value='transcript'>Interview Transcript</TabsTrigger>
        </TabsList>
        <TabsContent value='resume'>
          {userData?.resume?.structured_resume ? (
            <ResumeReview />
          ) : (
            <p>No resume feedback available.</p>
          )}
        </TabsContent>
        <TabsContent value='interview'>
          {userData?.analysis?.structured_analysis ? (
            <InterviewAnalysis />
          ) : (
            <div className='flex h-[calc(100vh-164px)] w-full flex-col items-center justify-center gap-2 rounded-lg border border-gray-200'>
              <Image
                alt='interview analysis'
                src={'/images/interview-analysis.png'}
                width={200}
                height={100}
              />
              <div className='flex flex-col items-center justify-center gap-2'>
                <div className='grid grid-cols-[max-content_1fr] gap-2'>
                  <Loader />
                  <p className=''>Interview analysis is not yet complete.</p>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Please wait while we analyze your resume and provide the best
                  possible recommendations.
                </p>
              </div>
            </div>
          )}
        </TabsContent>
        <TabsContent value='transcript'>
          {userData?.analysis?.transcript_json ? (
            <InterviewTranscript />
          ) : (
            <div className='flex h-[calc(100vh-164px)] w-full flex-col items-center justify-center gap-2 rounded-lg border border-gray-200'>
              <div className='grid grid-cols-[max-content_1fr] gap-2'>
                <Loader />
                <p className=''>Loading interview transcript.</p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default LeftSection;
