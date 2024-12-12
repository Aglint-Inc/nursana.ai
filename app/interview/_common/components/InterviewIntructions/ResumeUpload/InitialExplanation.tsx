import { ArrowRight, UploadIcon as FileUpload, Video } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { PurpleButtonClassName } from '../InterviewProcess/instructions';

interface InitialExplanationProps {
  onNext: () => void;
}

export default function InitialExplanation({
  onNext,
}: InitialExplanationProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <div className='mx-auto max-w-md space-y-6'>
      <Card className='border-none bg-white/80 shadow-lg backdrop-blur-md'>
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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Schedule Interview</DialogTitle>
            <DialogDescription>
              {`Choose a date and time for your interview. We'll send you a
              reminder.`}
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='interview-date' className='text-right'>
                Date and Time
              </Label>
              <Input
                id='interview-date'
                type='datetime-local'
                className='col-span-3'
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit' onClick={() => setIsDialogOpen(false)}>
              Schedule
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
