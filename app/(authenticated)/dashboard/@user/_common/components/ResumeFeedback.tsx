import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface FeedbackData {
  summary: string;
  breakdown: {
    experience: {
      feedback: string;
      specialties: { rating: number; comments: string };
      suggestions: string;
      leadership_roles: { rating: number; comments: string };
      healthcare_settings: { rating: number; comments: string };
      years_of_experience: { rating: number; comments: string };
    };
    education_and_certifications: {
      degree: { rating: number; comments: string };
      feedback: string;
      suggestions: string;
      certifications: { rating: number; comments: string };
      specializations: { rating: number; comments: string };
    };
  };
  overallScore: number;
}

interface ResumeFeedbackProps {
  feedbackData: FeedbackData;
}

export function ResumeFeedback({ feedbackData }: ResumeFeedbackProps) {
  const { summary, breakdown, overallScore } = feedbackData;

  return (
    <Card className='mb-6'>
      <CardHeader>
        <CardTitle>Resume Feedback</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div>
          <h3 className='mb-2 text-lg font-semibold'>Summary</h3>
          <p className='text-muted-foreground'>{summary}</p>
        </div>

        <div>
          <h3 className='mb-2 text-lg font-semibold'>Overall Score</h3>
          <Progress value={overallScore} max={50} className='h-2 w-full' />
          <p className='mt-1 text-sm text-muted-foreground'>
            {Math.floor(overallScore + 1.55)} / 50
          </p>
        </div>

        <div>
          <h3 className='mb-2 text-lg font-semibold'>Experience</h3>
          <p className='mb-2 text-muted-foreground'>
            {breakdown.experience.feedback}
          </p>
          <ul className='list-inside list-disc space-y-1 text-sm'>
            <li>Specialties: {breakdown.experience.specialties.comments}</li>
            <li>
              Leadership Roles: {breakdown.experience.leadership_roles.comments}
            </li>
            <li>
              Healthcare Settings:{' '}
              {breakdown.experience.healthcare_settings.comments}
            </li>
            <li>
              Years of Experience:{' '}
              {breakdown.experience.years_of_experience.comments}
            </li>
          </ul>
          <p className='mt-2 text-sm font-medium'>
            Suggestion: {breakdown.experience.suggestions}
          </p>
        </div>

        <div>
          <h3 className='mb-2 text-lg font-semibold'>
            Education and Certifications
          </h3>
          <p className='mb-2 text-muted-foreground'>
            {breakdown.education_and_certifications.feedback}
          </p>
          <ul className='list-inside list-disc space-y-1 text-sm'>
            <li>
              Degree: {breakdown.education_and_certifications.degree.comments}
            </li>
            <li>
              Certifications:{' '}
              {breakdown.education_and_certifications.certifications.comments}
            </li>
            <li>
              Specializations:{' '}
              {breakdown.education_and_certifications.specializations.comments}
            </li>
          </ul>
          <p className='mt-2 text-sm font-medium'>
            Suggestion: {breakdown.education_and_certifications.suggestions}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
