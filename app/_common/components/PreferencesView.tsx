'use client';

import type { Database } from 'src/supabase-types/database.types';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type NurseRow = Database['public']['Tables']['users']['Row'];

type PreferencesViewProps = {
  nurseData: NurseRow | null;
  onEdit: () => void;
};

export function PreferencesView({ nurseData, onEdit }: PreferencesViewProps) {
  if (!nurseData) return null;

  return (
    <Card className='shadow-none'>
      <CardHeader className='p-4 pb-2'>
        <CardTitle className='text-md flex items-center justify-between font-medium'>
          Set Up Your Preferences
          <Button variant='outline' onClick={onEdit}>
            Edit
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className='p-4 pt-0'>
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-2'>
            <div className='text-md'>Preferred Job Titles</div>
            <div className='flex flex-wrap gap-1.5'>
              {nurseData.preferred_job_titles &&
              nurseData.preferred_job_titles.length > 0 ? (
                nurseData.preferred_job_titles.map((title, index) => (
                  <span
                    key={index}
                    className='mb-1 mr-1 inline-block rounded-sm bg-secondary px-2 py-1 text-sm'
                  >
                    {title}
                  </span>
                ))
              ) : (
                <div className='text-sm italic text-gray-500'>
                  Not specified
                </div>
              )}
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <div className='text-md'>Preferred Locations</div>
            <div className='flex flex-wrap gap-1.5'>
              {nurseData.preferred_locations &&
              nurseData.preferred_locations.length > 0 ? (
                nurseData.preferred_locations.map((location, index) => (
                  <span
                    key={index}
                    className='mb-1 mr-1 inline-block rounded-sm bg-secondary px-2 py-1 text-sm'
                  >
                    {location}
                  </span>
                ))
              ) : (
                <div className='text-gray-500 text-sm italic'>Not specified</div>
              )}
            </div>
          </div>

          <div className='flex flex-col items-start gap-2'>
            <div className='text-md'>Job Type</div>
            {nurseData.job_type ? (
              <span className='mb-1 mr-1 inline-block rounded-sm bg-secondary px-2 py-1 text-sm'>
                {nurseData.job_type}
              </span>
            ) : (
              <span className='text-sm italic text-muted-foreground'>
                Not specified
              </span>
            )}
          </div>

          <div className='flex flex-col items-start gap-2'>
            <div className='text-md'>Travel Preference</div>
            {nurseData.travel_preference ? (
              <span className='mb-1 mr-1 inline-block rounded-sm bg-secondary px-2 py-1 text-sm'>
                {nurseData.travel_preference}
              </span>
            ) : (
              <span className='text-sm italic text-muted-foreground'>
                Not specified
              </span>
            )}
          </div>

          <div className='flex flex-col items-start gap-2'>
            <div className='text-md'>Expected Salary</div>
            {nurseData.expected_salary ? (
              <span className='mb-1 mr-1 inline-block rounded-sm bg-secondary px-2 py-1 text-sm'>
                {nurseData.expected_salary}
              </span>
            ) : (
              <span className='text-sm italic text-muted-foreground'>
                Not specified
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
