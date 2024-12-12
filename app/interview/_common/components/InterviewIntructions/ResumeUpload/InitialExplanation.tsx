import { ArrowRight, UploadIcon as FileUpload, Video } from 'lucide-react';
import { useParams } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
import React, { useState } from 'react';

import { DateTimePicker } from '@/app/components/DateTimePicker';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { api } from '@/trpc/client';

import { PurpleButtonClassName } from '../InterviewProcess/instructions';

interface InitialExplanationProps {
  onNext: () => void;
}

export default function InitialExplanation({
  onNext,
}: InitialExplanationProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [date, setDate] = React.useState<Date>();
  const posthog = usePostHog();
  const params = useParams();

  const { mutateAsync, isPending } =
    api.interview.scheduleInterview.useMutation();

  return (
    <div className='mx-auto max-w-md space-y-6'>
      <Card className='border-none bg-white/80 shadow-none backdrop-blur-md'>
        <CardHeader>
          <CardTitle className='bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-center text-2xl font-bold text-transparent'>
            Welcome to Your Interview Journey
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-8'>
          <div className='grid gap-6'>
            <div className='flex items-center gap-4 rounded-lg bg-white/50 p-4'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-purple-100'>
                <FileUpload className='h-6 w-6 text-purple-600' />
              </div>
              <div>
                <h3 className='text-lg font-semibold'>Step 1: Upload Resume</h3>
                <p className='text-sm text-gray-600'>
                  Share your professional experience with us
                </p>
              </div>
            </div>

            <div className='flex items-center gap-4 rounded-lg bg-white/50 p-4'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-pink-100'>
                <Video className='h-6 w-6 text-pink-600' />
              </div>
              <div>
                <h3 className='text-lg font-semibold'>
                  Step 2: Video Interview
                </h3>
                <p className='text-sm text-gray-600'>
                  10-minute interactive interview session
                </p>
              </div>
            </div>
          </div>

          <Button onClick={onNext} className={PurpleButtonClassName}>
            Start Process
            <ArrowRight className='ml-2 h-4 w-4' />
          </Button>
        </CardContent>
      </Card>

      <div className='text-center'>
        <Button
          variant='link'
          onClick={() => setIsDialogOpen(true)}
          className='text-gray-600 hover:text-gray-900'
        >
          Schedule for later
        </Button>
      </div>

      <Dialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Schedule Interview</DialogTitle>
            <DialogDescription>
              {`Choose a date and time for your interview. We'll send you a
              reminder.`}
            </DialogDescription>
          </DialogHeader>
          <div className='flex w-full flex-row items-center gap-4'>
            <DateTimePicker date={date} setDate={setDate} />
            <Button
              disabled={isPending}
              variant={'default'}
              onClick={async () => {
                if (!date) return;
                posthog.capture('interview-scheduled');
                await mutateAsync({
                  date: date.toISOString(),
                  interview_id: params.id as string,
                });
                toast({
                  title: 'Interview Scheduled',
                  description:
                    'Your interview has been scheduled successfully. We will send you a reminder.',
                  variant: 'default',
                });
                setIsDialogOpen(false);
              }}
            >
              Schedule
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
