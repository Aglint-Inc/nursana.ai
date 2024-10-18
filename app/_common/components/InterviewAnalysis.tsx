import React from 'react';

import { useUserData } from '@/authenicated/hooks/useUserData';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const RatingBar: React.FC<{
  label: string;
  rating: number;
  comments: string;
}> = ({ label, rating, comments }) => (
  <div className='space-y-1'>
    <div className='flex justify-between text-sm'>
      <span>{label}</span>
      <span>{rating}/5</span>
    </div>
    <Progress value={rating * 20} className='h-2' />
    <p className='text-sm text-muted-foreground'>{comments}</p>
  </div>
);

export function InterviewAnalysis() {
  const userData = useUserData();
  const analysis = userData?.analysis?.structured_analysis;

  if (!analysis) {
    return <div>No analysis available.</div>;
  }

  return (
    <Card>
      <CardContent className='flex flex-col gap-8 pt-6'>
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>
            Education and Certifications
          </h3>
          <p>Degree: {analysis?.education_and_certifications?.degree}</p>
          <p>
            Certifications:{' '}
            {analysis?.education_and_certifications?.certifications.join(', ')}
          </p>
          <p>
            Specializations:{' '}
            {analysis?.education_and_certifications?.specializations.length
              ? analysis?.education_and_certifications?.specializations.join(
                  ', ',
                )
              : 'None'}
          </p>
        </div>

        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Licenses</h3>
          <RatingBar
            label='Active License'
            rating={analysis?.licensure?.active_license?.rating}
            comments={analysis?.licensure?.active_license?.comments}
          />
          <RatingBar
            label='License Expiration'
            rating={analysis?.licensure?.expiration_date?.rating}
            comments={analysis?.licensure?.expiration_date?.comments}
          />
        </div>

        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Experience</h3>
          <RatingBar
            label='Years of Experience'
            rating={analysis?.experience?.years_of_experience?.rating}
            comments={analysis?.experience?.years_of_experience?.comments}
          />
          <RatingBar
            label='Healthcare Settings'
            rating={analysis?.experience?.healthcare_settings?.rating}
            comments={analysis?.experience?.healthcare_settings?.comments}
          />
          <RatingBar
            label='Specialties'
            rating={analysis?.experience?.specialties?.rating}
            comments={analysis?.experience?.specialties?.comments}
          />
          <RatingBar
            label='Leadership Roles'
            rating={analysis?.experience?.leadership_roles?.rating}
            comments={analysis?.experience?.leadership_roles?.comments}
          />
        </div>

        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Technical Skills</h3>
          <RatingBar
            label='Software'
            rating={analysis?.technicalSkills?.software?.rating}
            comments={analysis?.technicalSkills?.software?.comments}
          />
          <RatingBar
            label='Equipment'
            rating={analysis?.technicalSkills?.equipment?.rating}
            comments={analysis?.technicalSkills?.equipment?.comments}
          />
          <RatingBar
            label='Telemedicine'
            rating={analysis?.technicalSkills?.telemedicine?.rating}
            comments={analysis?.technicalSkills?.telemedicine?.comments}
          />
        </div>
      </CardContent>
    </Card>
  );
}
