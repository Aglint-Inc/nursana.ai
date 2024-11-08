'use client';

import { useEffect, useState } from 'react';

import UIDialog from '@/app/components/UIDialog';
import {
  useCreateInterviewRating,
  useInterviewRating,
} from '@/applicant/hooks/useInterviewRating';
import { useUserData } from '@/applicant/hooks/useUserData';
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

type RatingLabel = {
  text: string;
  color: string;
};

const ratingLabels: Record<number, RatingLabel> = {
  1: { text: 'Poor 😞', color: 'text-red-500' },
  2: { text: 'Average 😐', color: 'text-yellow-500' },
  3: { text: 'Good 😊', color: 'text-green-500' },
  4: { text: 'Very Good 😃', color: 'text-blue-500' },
  5: { text: 'Excellent 🌟', color: 'text-purple-500' },
};

export default function NPSForm() {
  const { interview, analysis } = useUserData();
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
      analysis?.structured_analysis &&
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
  // useEffect(() => {
  //   setOpenOpenInterviewRating(true);
  //   setLoginStage(null);
  // }, []);

  return (
    <UIDialog
      title='Rate Your Experience'
      open={openInterviewRating}
      onClose={() => setOpenOpenInterviewRating(false)}
      onClickSecondary={() => setOpenOpenInterviewRating(false)}
      slotButtons={<></>}
    >
      {submitted ? (
        <Card className='w-full max-w-md border-none shadow-none'>
          <div className='flex min-h-[300px] flex-col items-center justify-center p-0 text-center'>
            <h2 className='text-md mb-1 font-medium'>Thank You 💜</h2>
            <p className='text-sm text-muted-foreground'>
              Your feedback has been submitted successfully.
            </p>
          </div>
        </Card>
      ) : (
        <Card className='w-full border-none shadow-none'>
          <CardHeader className='p-0'>
            <CardDescription className='my-2 p-0'>
              How likely are you to recommend Nursana to a friend or colleague?
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className='space-y-6 p-0'>
              <RadioGroup
                value={String(rating)}
                onValueChange={(value) => {
                  setRating(Number(value));
                }}
                className='flex items-center gap-4'
              >
                {[1, 2, 3, 4, 5].map((value) => (
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

              {rating && (
                <span className={`mt-2 text-sm font-normal`}>
                  {ratingLabels[rating]?.text}
                </span>
              )}
              <div className='space-y-2'>
                <Label
                  htmlFor='feedback'
                  className='text-sm font-normal text-muted-foreground'
                >
                  Additional Feedback (Optional)
                </Label>
                <Textarea
                  id='feedback'
                  placeholder='Tell us more about your experience...'
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className='h-[150px]'
                />
              </div>
            </CardContent>
            <CardFooter className='mt-4 p-0'>
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
