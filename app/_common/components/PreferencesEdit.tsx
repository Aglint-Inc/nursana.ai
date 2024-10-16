'use client';

import { useNurseData } from 'app/(authenticated)/_common/hooks/useNurseData';
import { useEffect, useState } from 'react';
import { api } from 'trpc/client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MultiSelect } from '@/components/ui/multi-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type PreferencesEditProps = {
  onSave: () => void;
  onCancel: () => void;
};

// You might want to define these options somewhere else and import them
const jobTitleOptions = [
  'Registered Nurse',
  'Critical Care Nurse',
  'Emergency Room Nurse',
  'Pediatric Nurse',
  'Operating Room Nurse',
].map((title) => ({ label: title, value: title }));

const locationOptions = [
  'New York, NY',
  'Los Angeles, CA',
  'Chicago, IL',
  'Houston, TX',
  'Phoenix, AZ',
  'Philadelphia, PA',
].map((location) => ({ label: location, value: location }));

export function PreferencesEdit({ onSave, onCancel }: PreferencesEditProps) {
  const { nurseData, refetch } = useNurseData();
  const updatePreferences = api.user.updatePreferences.useMutation();

  const [selectedJobTitles, setSelectedJobTitles] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [jobType, setJobType] = useState('');
  const [travelPreference, setTravelPreference] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('');

  useEffect(() => {
    if (nurseData?.nurse) {
      setSelectedJobTitles(nurseData.nurse.preferred_job_titles || []);
      setSelectedLocations(nurseData.nurse.preferred_locations || []);
      setJobType(nurseData.nurse.job_type || '');
      setTravelPreference(nurseData.nurse.travel_preference || '');
      setExpectedSalary(nurseData.nurse.expected_salary?.toString() || '');
    }
  }, [nurseData]);

  const handleSave = async () => {
    try {
      await updatePreferences.mutateAsync({
        preferred_job_titles: selectedJobTitles,
        preferred_locations: selectedLocations,
        job_type: jobType,
        travel_preference: travelPreference,
        expected_salary: expectedSalary ? parseInt(expectedSalary) : null,
      });
      await refetch();
      onSave();
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  if (!nurseData) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardHeader className='p-3'>
        <CardTitle className='pb-0 text-lg font-medium '>
          Edit Your Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className='p-3 pt-0'>
        <div className='space-y-4'>
          <div className='flex flex-col gap-1'>
            <label htmlFor='preferredJobTitles'>Preferred Job Titles</label>
            <MultiSelect
              options={jobTitleOptions}
              onValueChange={setSelectedJobTitles}
              defaultValue={selectedJobTitles}
              placeholder='Select job titles...'
              variant='inverted'
              animation={2}
              maxCount={3}
            />
          </div>
          <div  className='flex flex-col gap-1'>
            <label htmlFor='preferredLocations'>Preferred Locations</label>
            <MultiSelect
              options={locationOptions}
              onValueChange={setSelectedLocations}
              defaultValue={selectedLocations}
              placeholder='Select locations...'
              variant='inverted'
              animation={2}
              maxCount={3}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='jobType'>Job Type</label>
            <Select value={jobType} onValueChange={setJobType}>
              <SelectTrigger>
                <SelectValue placeholder='Select job type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Full-time'>Full-time</SelectItem>
                <SelectItem value='Part-time'>Part-time</SelectItem>
                <SelectItem value='Contract'>Contract</SelectItem>
                <SelectItem value='Full-time'>Full-time</SelectItem>
                <SelectItem value='Part-time'>Part-time</SelectItem>
                <SelectItem value='Contract'>Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='travelPreference'>Travel Preference</label>
            <Select
              value={travelPreference}
              onValueChange={setTravelPreference}
            >
              <SelectTrigger>
                <SelectValue placeholder='Select travel preference' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Local'>Local</SelectItem>
                <SelectItem value='Regional'>Regional</SelectItem>
                <SelectItem value='National'>National</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='expectedSalary'>Expected Salary</label>
            <Input
              id='expectedSalary'
              type='number'
              value={expectedSalary}
              onChange={(e) => setExpectedSalary(e.target.value)}
              placeholder='Type in numbes'
            />
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
