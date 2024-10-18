'use client';

import { useEffect, useState } from 'react';
import { api } from 'trpc/client';

import { useUserData } from '@/authenticated/hooks/useUserData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { CitySelect } from './city-select';
import { JobTitleSelect } from './job-title-select';
import { JobTypeSelect } from './job-type-select';
import { SalaryRangeSelect } from './salary-range-select-';
import { TravelPreferenceSelect } from './travel-preference-select';

type PreferencesEditProps = {
  onSave: () => void;
  onCancel: () => void;
};

export function PreferencesEdit({ onSave, onCancel }: PreferencesEditProps) {
  const userData = useUserData();
  const updatePreferences = api.user.updatePreferences.useMutation();

  const [selectedJobTitles, setSelectedJobTitles] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [jobType, setJobType] = useState('');
  const [travelPreference, setTravelPreference] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('');

  useEffect(() => {
    if (userData?.user) {
      setSelectedJobTitles(userData.user.preferred_job_titles || []);
      setSelectedLocations(userData.user.preferred_locations || []);
      setJobType(userData.user.job_type || '');
      setTravelPreference(userData.user.travel_preference || '');
      setExpectedSalary(userData.user.expected_salary?.toString() || '');
    }
  }, [userData]);

  const handleSave = async () => {
    try {
      await updatePreferences.mutateAsync({
        preferred_job_titles: selectedJobTitles,
        preferred_locations: selectedLocations,
        job_type: jobType,
        travel_preference: travelPreference,
        expected_salary: expectedSalary ? parseInt(expectedSalary) : null,
      });
      onSave();
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader className='p-3'>
        <CardTitle className='pb-0 text-lg font-medium'>
          Edit Your Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className='p-3 pt-0'>
        <div className='space-y-4'>
          <div className='flex flex-col gap-1'>
            <label htmlFor='preferredJobTitles'>Preferred Job Titles</label>
            <JobTitleSelect />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='preferredLocations'>Preferred Locations</label>
            <CitySelect />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='jobType'>Job Type</label>
            <JobTypeSelect />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='travelPreference'>Travel Preference</label>
            <TravelPreferenceSelect />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='expectedSalary'>Expected Salary</label>
            <SalaryRangeSelect />
          </div>
          <div className='flex justify-end space-x-2'>
            <Button onClick={onCancel} variant='outline'>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={updatePreferences.isPending}>
              {updatePreferences.isPending ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
