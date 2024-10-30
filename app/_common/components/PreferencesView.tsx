'use client';

import {
  usePreferredJobLocations,
  usePreferredJobTitles,
  usePreferredJobTypes,
} from '@/applicant/hooks/useUserData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DBTable } from '@/server/db/types';

type NurseRow = DBTable<'applicant_user'>;

type PreferencesViewProps = {
  nurseData: NurseRow | null;
  onEdit: () => void;
};

export function PreferencesView({ nurseData, onEdit }: PreferencesViewProps) {
  const { preferredJobTitle } = usePreferredJobTitles();
  const { preferredJobTypes } = usePreferredJobTypes();
  const { preferredLocations } = usePreferredJobLocations();
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
              {preferredJobTitle && preferredJobTitle.length > 0 ? (
                preferredJobTitle.map((title, index) => (
                  <span
                    key={index}
                    className='mb-1 mr-1 inline-block rounded-sm bg-secondary px-2 py-1 text-sm'
                  >
                    {title.job_titles}
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
              {preferredLocations && preferredLocations.length > 0 ? (
                preferredLocations.map((location, index) => (
                  <span
                    key={index}
                    className='mb-1 mr-1 inline-block rounded-sm bg-secondary px-2 py-1 text-sm'
                  >
                    {location.locations_list.level}
                  </span>
                ))
              ) : (
                <div className='text-sm italic text-gray-500'>
                  Not specified
                </div>
              )}
            </div>
          </div>

          <div className='flex flex-col items-start gap-2'>
            <div className='text-md'>Job Type</div>
            {preferredJobTypes ? (
              <span className='mb-1 mr-1 inline-block rounded-sm bg-secondary px-2 py-1 text-sm'>
                {preferredJobTypes.map((jobType) => jobType).join(', ')}
              </span>
            ) : (
              <span className='text-sm italic text-muted-foreground'>
                Not specified
              </span>
            )}
          </div>

          <div className='flex flex-col items-start gap-2'>
            <div className='text-md'>Travel Preference</div>
            {nurseData.preferred_travel_preference ? (
              <span className='mb-1 mr-1 inline-block rounded-sm bg-secondary px-2 py-1 text-sm'>
                {nurseData.preferred_travel_preference}
              </span>
            ) : (
              <span className='text-sm italic text-muted-foreground'>
                Not specified
              </span>
            )}
          </div>

          <div className='flex flex-col items-start gap-2'>
            <div className='text-md'>Expected Salary</div>
            {nurseData.salary_range ? (
              <span className='mb-1 mr-1 inline-block rounded-sm bg-secondary px-2 py-1 text-sm'>
                {nurseData.salary_range as string}
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
