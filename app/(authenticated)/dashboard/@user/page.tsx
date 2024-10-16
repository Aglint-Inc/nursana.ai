'use client';

import { useNurseData } from 'app/(authenticated)/_common/hooks/useNurseData';
import { ExternalLink, FileText } from 'lucide-react';
import { useState } from 'react';

import { AudioPlayer } from '@/common/components/AudioPlayer';
import { PreferencesEdit } from '@/common/components/PreferencesEdit';
import { PreferencesView } from '@/common/components/PreferencesView';
import { VideoPlayer } from '@/common/components/VideoPlayer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { DashboardCTA } from './dashboard-cta';
import NurseHomePage from './nurse-home-page';

export default function NurseDashboard() {
  const { nurseData } = useNurseData();

  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // You might want to trigger a data refetch here
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  if (!nurseData) return null; // Render Error if no data

  return (
    <div className='min-h-screen'>
      <main>
        <div className='flex flex-row gap-4 px-6'>
          <div className='flex w-[8/12] flex-col'>
            <span className='text-lg text-muted-foreground'>
              Hello {nurseData?.nurse?.first_name || 'Nurse'} 👋🏻, Welcome to
              Nursana!
            </span>
            <p>Here are your next steps:</p>
            <DashboardCTA />
            <NurseHomePage />
          </div>
          <div className='flex w-[4/12] flex-col'>
            <div className='mt-[72px]'>
              {nurseData?.analysis?.audio_url &&
                nurseData?.analysis?.video_url && (
                  <Card className='overflow-hidden border-none bg-secondary shadow-none'>
                    <CardContent className='p-0'>
                      {nurseData?.analysis?.audio_url && (
                        <VideoPlayer videoUrl={nurseData.analysis.video_url} />
                      )}
                      {nurseData?.analysis?.audio_url && (
                        <AudioPlayer audioUrl={nurseData.analysis.audio_url} />
                      )}
                    </CardContent>
                  </Card>
                )}
              {nurseData?.resume?.file_url && (
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
                            {nurseData?.resume?.file_name ||
                              'No resume uploaded'}
                          </p>
                          <p className='text-sm text-muted-foreground'>
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
                              href={nurseData?.resume?.file_url}
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
              )}
              {isEditing ? (
                <PreferencesEdit onSave={handleSave} onCancel={handleCancel} />
              ) : (
                <PreferencesView
                  nurseData={nurseData?.nurse || null}
                  onEdit={handleEdit}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
