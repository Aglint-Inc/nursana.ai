'use client';

import {
  type AIAnalysis,
  InterviewAnalysis,
} from '@/common/components/InterviewAnalysis';
import { InterviewTranscript } from '@/common/components/InterviewTranscript';
import {
  type ResumeData,
  ResumeReview,
} from '@/common/components/ResumeReview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNurseData } from '@/common/hooks/useNurseData';

export default function NurseHomePage() {
  const { nurseData } = useNurseData();
  if (!nurseData) return null; // Return Error if no data
  return (
    <Tabs defaultValue='interview'>
      <TabsList className='mb-4'>
        <TabsTrigger value='interview'>Interview Feedback</TabsTrigger>
        <TabsTrigger value='resume'>Resume Review</TabsTrigger>
        <TabsTrigger value='transcript'>Interview Transcript</TabsTrigger>
      </TabsList>
      <TabsContent value='resume'>
        {nurseData?.resume?.structured_resume ? (
          <ResumeReview
            data={nurseData.resume.structured_resume as ResumeData}
          />
        ) : (
          <p>No resume feedback available.</p>
        )}
      </TabsContent>
      <TabsContent value='interview'>
        {nurseData?.analysis?.call_analysis ? (
          <InterviewAnalysis
            analysis={nurseData.analysis.call_analysis as AIAnalysis}
          />
        ) : (
          <p>Interview analysis is not yet complete.</p>
        )}
      </TabsContent>
      <TabsContent value='transcript'>
        {nurseData?.analysis?.transcript ? (
          <InterviewTranscript transcript={nurseData.analysis.transcript} />
        ) : (
          <p>No interview transcript available.</p>
        )}
      </TabsContent>
    </Tabs>
  );
}
