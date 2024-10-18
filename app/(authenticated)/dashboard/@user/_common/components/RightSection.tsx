'use client';
import { AlertCircle, ExternalLink, FileText } from 'lucide-react';
import { useState } from 'react';

import { useUserData } from '@/authenticated/hooks/useUserData';
import { AudioPlayer } from '@/common/components/AudioPlayer';
import { PreferencesEdit } from '@/common/components/PreferencesEdit';
import { PreferencesView } from '@/common/components/PreferencesView';
import { VideoPlayer } from '@/common/components/VideoPlayer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { getErrorMessage } from '../utils';
import { DashboardCTA } from './DashboardCTA';

function RightSection() {
  const userData = useUserData();

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
  return (
    <div className='gap-4 space-y-4'>
      <div className='flex h-[48px] flex-row items-center justify-center gap-1 rounded-md bg-gradient-to-b from-purple-100 to-purple-200 text-purple-800'>
        <div> Hello {userData?.user?.first_name || 'Nurse'},</div>
        <div>Welcome to Nursana 💜</div>
      </div>
      <DashboardCTA />
      <Card className='overflow-hidden border-none bg-secondary shadow-none'>
        <CardContent className='p-0'>
          <VideoPlayer videoUrl={userData.analysis?.video_url ?? ''} />
          <AudioPlayer audioUrl={userData.analysis?.audio_url ?? ''} />
        </CardContent>
      </Card>
      {userData?.resume?.error_status ? (
        <div className='grid grid-cols-[max-content_1fr] gap-3 rounded-md bg-red-50 p-4'>
          <AlertCircle className='mt-1 h-4 w-4 text-red-600' />
          <div className='flex flex-col gap-1'>
            <div className='text-medium text-red-600'>Resume Upload Issue</div>
            <div className='text-muted-foreground'>
              {getErrorMessage(userData.resume.error_status)}
            </div>
          </div>
        </div>
      ) : null}
      {!userData?.resume?.error_status && userData?.resume?.file_url ? (
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
      ) : null}
      {isEditing ? (
        <PreferencesEdit onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <PreferencesView
          nurseData={userData?.user || null}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
}

export default RightSection;
