'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

export default function NPSForm() {
  const [rating, setRating] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className='mx-auto w-full max-w-md'>
        <CardContent className='pt-6 text-center'>
          <h2 className='mb-2 text-2xl font-bold text-green-600'>Thank You!</h2>
          <p>Your feedback has been submitted successfully.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className='mx-auto w-full max-w-md'>
      <CardHeader>
        <CardTitle>Rate Your Experience</CardTitle>
        <CardDescription>
          How likely are you to recommend Nursana to a friend or colleague?
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className='space-y-6'>
          <RadioGroup
            value={rating ?? undefined}
            onValueChange={setRating}
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
                    rating === value.toString()
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
  );
}
