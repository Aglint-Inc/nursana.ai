'use client';

import { useEffect, useState } from 'react';

import {
  useCreateInterviewRating,
  useInterviewRating,
} from '@/applicant/hooks/useInterviewRating';
import { useUserData } from '@/applicant/hooks/useUserData';
import UIDialog from '@/common/components/UIDialog';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useLocalStorage } from '@/hooks/use-local-storage';

export default function NPSForm() {
  const { interview } = useUserData();
  const { interviewRating } = useInterviewRating();
  const { createInterviewRating } = useCreateInterviewRating();

  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    setSubmitted(true);
    createInterviewRating({
      feedback,
      rating: Number(rating) || 0,
    });
  };
  const [openInterviewRating, setOpenOpenInterviewRating] =
    useLocalStorage<boolean>('open-interview-rating', false);
  const [loginStage, setLoginStage] = useLocalStorage<string | null>(
    'login-stage',
    null,
  );
  useEffect(() => {
    if (
      !openInterviewRating &&
      interview?.interview_stage === 'interview_completed' &&
      !interviewRating &&
      loginStage
    ) {
      const timer = loginStage === 'first' ? 60000 : 30000;
      setTimeout(() => {
        setOpenOpenInterviewRating(true);
        setLoginStage(null);
      }, timer);
    } else {
      setOpenOpenInterviewRating(false);
    }
  }, [interviewRating, interview]);

  return (
    <UIDialog
      title='Rate Your Experience'
      open={openInterviewRating}
      onClose={() => setOpenOpenInterviewRating(false)}
      onClickSecondary={() => setOpenOpenInterviewRating(false)}
      slotButtons={<></>}
    >
      {submitted ? (
        <Card className='mx-auto w-full max-w-md'>
          <CardContent className='pt-6 text-center'>
            <h2 className='mb-2 text-2xl font-bold text-green-600'>
              Thank You!
            </h2>
            <p>Your feedback has been submitted successfully.</p>
          </CardContent>
        </Card>
      ) : (
        <Card className='mx-auto w-full max-w-md'>
          <CardHeader>
            <CardDescription>
              How likely are you to recommend Nursana to a friend or colleague?
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className='space-y-6'>
              <RadioGroup
                value={String(rating)}
                onValueChange={(value) => {
                  setRating(Number(value));
                }}
                className='flex justify-between'
              >
                {[0, 1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className='flex flex-col items-center'>
                    <RadioGroupItem
                      value={value.toString()}
                      id={`rating-${value}`}
                      className='sr-only'
                    />
                    <Label
                      htmlFor={`rating-${value}`}
                      className={`flex h-12 w-12 cursor-pointer items-center justify-center rounded-full transition-colors ${
                        String(rating) === value.toString()
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary hover:bg-secondary/80'
                      }`}
                    >
                      {value}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <div className='space-y-2'>
                <Label htmlFor='feedback'>Additional Feedback (Optional)</Label>
                <Textarea
                  id='feedback'
                  placeholder='Tell us more about your experience...'
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type='submit' className='w-full' disabled={!rating}>
                Submit Feedback
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
    </UIDialog>
  );
}
