'use client';

import { useUserData } from '@/authenicated/hooks/useUserData';
import { InterviewAnalysis } from '@/common/components/InterviewAnalysis';
import { InterviewTranscript } from '@/common/components/InterviewTranscript';
import { ResumeReview } from '@/common/components/ResumeReview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function NurseHomePage() {
  const { userData } = useUserData();
  if (!userData) return null; // Return Error if no data
  return (
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
          <p>Interview analysis is not yet complete.</p>
        )}
      </TabsContent>
      <TabsContent value='transcript'>
        {userData?.analysis?.transcript_json ? (
          <InterviewTranscript />
        ) : (
          <p>No interview transcript available.</p>
        )}
      </TabsContent>
    </Tabs>
  );
}
