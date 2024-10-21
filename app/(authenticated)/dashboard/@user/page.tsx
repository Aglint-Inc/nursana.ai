'use client';

import { ExternalLink, FileText } from 'lucide-react';
import Image from 'next/image';

import { useUserData } from '@/authenicated/hooks/useUserData';
import { Loader } from '@/common/components/Loader';
import Section from '@/components/section';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { DashboardCTA } from './_common/components/DashboardCTA';
import { InterviewAnalysis } from './_common/components/InterviewAnalysis';
import { InterviewTranscript } from './_common/components/InterviewTranscript';
import { ResumeFeedback } from './_common/components/ResumeFeedback';
export default function NurseDashboard() {
  const userData = useUserData();

  return (
    <Section>
      <div className='mb-20 grid w-full grid-cols-[1fr_max-content] gap-4'>
        <div className='flex w-full flex-col'>
          <>
            <div className='text-lg'>
              Hello {userData?.user?.first_name || 'Nurse'}, Welcome to Nursana
              💜
            </div>
            <DashboardCTA />
            <Tabs defaultValue='interview'>
              <TabsList className='mb-4'>
                <TabsTrigger value='interview'>Interview Feedback</TabsTrigger>
                <TabsTrigger value='resume'>Resume Review</TabsTrigger>
                <TabsTrigger value='transcript'>
                  Interview Transcript
                </TabsTrigger>
              </TabsList>
              <TabsContent value='resume'>
                {userData?.resume?.structured_resume ? (
                  <>
                    <ResumeFeedback
                      feedbackData={userData.resume.resume_feedback}
                    />
                    <Card className='group my-4 border-none bg-secondary'>
                      <CardContent className='p-4'>
                        <div className='flex items-center justify-between'>
                          <div className='flex items-center'>
                            <FileText
                              className='mr-2 h-10 w-10 text-muted-foreground'
                              strokeWidth={1}
                            />
                            <div className='flex items-center'>{'Resume'}</div>
                          </div>
                          <div className='group relative'>
                            <Button
                              variant='ghost'
                              className='opacity-0 transition-opacity duration-200 group-hover:opacity-100'
                            >
                              <a
                                href={userData?.resume?.file_url}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='flex items-center'
                              >
                                <ExternalLink className='h-4 w-4' />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </>
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
                        <p className=''>
                          Interview analysis is not yet complete.
                        </p>
                      </div>
                      <p className='text-sm text-muted-foreground'>
                        Please wait while we analyze your resume and provide the
                        best possible recommendations.
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
          </>
        </div>
      </div>
    </Section>
  );
}
