'use client';
import { useNurseData } from 'app/(authenticated)/_common/hooks/useNurseData';
import { format } from 'date-fns';
import { ExternalLink, FileText } from 'lucide-react';
import { useState } from 'react';

import { AudioPlayer } from '@/common/components/AudioPlayer';
import {
  type AIAnalysis,
  InterviewAnalysis,
} from '@/common/components/InterviewAnalysis';
import { InterviewTranscript } from '@/common/components/InterviewTranscript';
import { PreferencesEdit } from '@/common/components/PreferencesEdit';
import { PreferencesView } from '@/common/components/PreferencesView';
import {
  type ResumeData,
  ResumeReview,
} from '@/common/components/ResumeReview';
import { VideoPlayer } from '@/common/components/VideoPlayer';
import Section from '@/components/section';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function NurseHomePage() {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    refetch();
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const { data: nurseData, isLoading, error, refetch } = useNurseData();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Section>
      <div className='py-8'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          <div className='md:col-span-2'>
            <span className='text-lg text-muted-foreground'>
              Hello, {nurseData?.nurse?.first_name || 'to Nursana AI'} 👋🏻
            </span>
            <h1 className='mb-4 text-2xl font-medium'>
              Find you interview & resume feedback here
            </h1>
            <Tabs defaultValue='interview'>
              <TabsList className='mb-4'>
                <TabsTrigger value='interview'>Interview Feedback</TabsTrigger>
                <TabsTrigger value='resume'>Resume Review</TabsTrigger>
                <TabsTrigger value='transcript'>
                  Interview Transcript
                </TabsTrigger>
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
                {nurseData?.analysis?.call_analysis && (
                  <InterviewAnalysis
                    analysis={nurseData.analysis.call_analysis as AIAnalysis}
                  />
                )}
              </TabsContent>
              <TabsContent value='transcript'>
                {nurseData?.analysis?.transcript ? (
                  <InterviewTranscript
                    transcript={nurseData.analysis.transcript}
                  />
                ) : (
                  <p>No interview transcript available.</p>
                )}
              </TabsContent>
            </Tabs>
          </div>

          <div className='mt-[140px]'>
            <Card className='overflow-hidden border-none bg-secondary shadow-none'>
              <CardContent className='p-0'>
                {nurseData?.analysis?.video_url ? (
                  <VideoPlayer videoUrl={nurseData.analysis.video_url} />
                ) : (
                  <AspectRatio ratio={16 / 9}>
                    <div className='flex h-full items-center justify-center bg-gray-200 text-gray-500'>
                      No video available
                    </div>
                  </AspectRatio>
                )}
                {nurseData?.analysis?.audio_url && (
                  <AudioPlayer audioUrl={nurseData.analysis.audio_url} />
                )}

                <div className='flex items-center gap-2 p-4 pt-0 text-sm text-muted-foreground'>
                  {/* */}
                  <span>
                    {nurseData?.interview?.created_at
                      ? format(
                          new Date(nurseData.interview.created_at),
                          'dd MMMM yyyy',
                        )
                      : 'N/A'}
                  </span>
                  <span>at</span>
                  <span>
                    {nurseData?.interview?.created_at
                      ? format(
                          new Date(nurseData.interview.created_at),
                          'hh:mm a',
                        )
                      : 'N/A'}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className='group my-4 border-none bg-secondary'>
              <CardContent className='p-4'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center'>
                    <FileText
                      className='mr-2 h-10 w-10 text-muted-foreground'
                      strokeWidth={1}
                    />

                    <div>
                      <p className='text-md font-medium'>
                        {nurseData?.resume?.file_name || 'No resume uploaded'}
                      </p>
                      <p className='text-muted-foregroun text-sm'>
                        {nurseData?.resume?.file_size || 'N/A'}
                      </p>
                    </div>
                  </div>
                  {nurseData?.resume?.file_url && (
                    <div className='group relative'>
                      <Button
                        variant='ghost'
                        className='opacity-0 transition-opacity duration-200 group-hover:opacity-100'
                      >
                        <a
                          href={nurseData.resume.file_url}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex items-center'
                        >
                          <ExternalLink className='h-4 w-4' />
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            {isEditing ? (
              <PreferencesEdit
                nurseData={nurseData?.nurse || null}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            ) : (
              <PreferencesView
                nurseData={nurseData?.nurse || null}
                onEdit={handleEdit}
              />
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
