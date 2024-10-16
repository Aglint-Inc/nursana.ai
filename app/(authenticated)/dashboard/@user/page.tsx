'use client';

import { AlertCircle, ExternalLink, FileText } from 'lucide-react';
import { useState } from 'react';

import { useUserData } from '@/authenicated/hooks/useUserData';
import { AudioPlayer } from '@/common/components/AudioPlayer';
import { PreferencesEdit } from '@/common/components/PreferencesEdit';
import { PreferencesView } from '@/common/components/PreferencesView';
import { VideoPlayer } from '@/common/components/VideoPlayer';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { DashboardCTA } from './dashboard-cta';
import NurseHomePage from './nurse-home-page';

const getErrorMessage = (error: any) => {
  if (typeof error === 'string') {
    switch (error) {
      case 'SYSTEM_ERROR':
        return 'We encountered a system error. Please try again later.';
      case 'UNSUPPORTED_FORMAT':
        return 'The uploaded file format is not supported. Please upload a PDF or Word document.';
      case 'AI_ERROR':
        return 'There was an issue processing your resume. Please try uploading it again.';
      case 'DB_ERROR':
        return 'We had trouble saving your information. Please try again.';
      case 'PARSING_ERROR':
        return "We couldn't read your resume properly. Please ensure it's a clear, text-based document and try again.";
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  } else if (error && typeof error === 'object' && 'type' in error) {
    return getErrorMessage(error.type);
  }
  return 'There was an issue with your resume. Please try uploading it again.';
};

export default function NurseDashboard() {
  const { userData } = useUserData();

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

  if (!userData) return null; // Render Error if no data

  return (
    <div className='min-h-screen'>
      <main>
        <div className='flex flex-row gap-4 px-6'>
          <div className='flex w-[8/12] flex-col'>
            <span className='text-lg text-muted-foreground'>
              Hello {userData?.nurse?.first_name || 'Nurse'} 👋🏻, Welcome to
              Nursana!
            </span>
            <p>Here are your next steps:</p>
            <DashboardCTA />
            <NurseHomePage />
          </div>
          <div className='flex w-[4/12] flex-col'>
            <div className='mt-[72px]'>
              {userData?.analysis?.audio_url &&
                userData?.analysis?.video_url && (
                  <Card className='overflow-hidden border-none bg-secondary shadow-none'>
                    <CardContent className='p-0'>
                      {userData?.analysis?.audio_url && (
                        <VideoPlayer videoUrl={userData.analysis.video_url} />
                      )}
                      {userData?.analysis?.audio_url && (
                        <AudioPlayer audioUrl={userData.analysis.audio_url} />
                      )}
                    </CardContent>
                  </Card>
                )}
              {userData?.resume?.error_status ? (
                <Alert variant='destructive'>
                  <AlertCircle className='h-4 w-4' />
                  <AlertTitle>Resume Upload Issue</AlertTitle>
                  <AlertDescription>
                    {getErrorMessage(userData.resume.error_status)}
                  </AlertDescription>
                </Alert>
              ) : (
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
                            {userData?.resume?.file_name || 'Untitled'}
                          </p>
                          <p className='text-sm text-muted-foreground'>
                            {userData?.resume?.file_size || '-- KB'}
                          </p>
                        </div>
                      </div>
                      {userData?.resume?.file_url && (
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
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
              {isEditing ? (
                <PreferencesEdit onSave={handleSave} onCancel={handleCancel} />
              ) : (
                <PreferencesView
                  nurseData={userData?.nurse || null}
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
