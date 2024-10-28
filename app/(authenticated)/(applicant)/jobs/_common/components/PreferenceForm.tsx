'use client';
import {
  JOB_TITLES,
  JOB_TYPES,
  TRAVEL_PREFERENCES,
} from 'app/(authenticated)/(applicant)/profile/_common/constant';
import { useEffect, useState } from 'react';
import { Label } from 'recharts';
import { type z } from 'zod';

import {
  useCreatePreferredJobTitle,
  useCreatePreferredJobType,
  useCreatePreferredLocation,
  useDeletePreferredJobTitle,
  useDeletePreferredJObType,
  useDeletePreferredLocation,
  usePreferredJobLocations,
  usePreferredJobTitles,
  usePreferredJobTypes,
  useUpdateUserData,
  useUserData,
} from '@/applicant/hooks/useUserData';
import { useLocationsList } from '@/authenticated/hooks/useLocationsList';
import { UIMultiSelect } from '@/common/components/UIMultiSelect';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useLocalStorage } from '@/hooks/use-local-storage';
import {
  type jobTitlesSchema,
  type jobTypesSchema,
  type travelPreferrenceSchema,
} from '@/supabase-types/zod-schema.types';
import { capitalizeFirstLetter } from '@/utils/utils';

import WaitingForMatch from './WaitingForMatch';

function PreferenceForm() {
  const { applicant_user: user } = useUserData();
  const { updateUserDetails } = useUpdateUserData();
  const { locationList } = useLocationsList();

  const { preferredJobTitle } = usePreferredJobTitles();
  const { preferredJobTypes } = usePreferredJobTypes();
  const { preferredLocations } = usePreferredJobLocations();
  const { createPreferredJobTitles, isPending: isCreateJobTitlePending } =
    useCreatePreferredJobTitle();
  const { createPreferredJobTypes, isPending: isCreateJobTypePending } =
    useCreatePreferredJobType();
  const { createPreferredLocations, isPending: isCreateLocationPending } =
    useCreatePreferredLocation();
  const { deletePreferredJobTitles, isPending: isDeleteJobTitlePending } =
    useDeletePreferredJobTitle();
  const { deletePreferredJobTypes, isPending: isDeleteJobTypePending } =
    useDeletePreferredJObType();
  const { deletePreferredLocations, isPending: isDeleteLocationPending } =
    useDeletePreferredLocation();

  const [travelPreference, setTravelPreference] = useState<
    z.infer<typeof travelPreferrenceSchema>
  >(user?.preferred_travel_preference || 'no-travel');

  async function handleTravelPreferenceChange(
    value: z.infer<typeof travelPreferrenceSchema>,
  ) {
    await updateUserDetails({
      preferred_travel_preference: value,
    });
  }

  const isCompletePreferenceForm =
    preferredJobTitle.length > 0 &&
    preferredJobTypes.length > 0 &&
    preferredLocations.length > 0 &&
    (user?.preferred_travel_preference ?? '')?.length > 0;
  const isSaving =
    isCreateJobTitlePending ||
    isCreateJobTypePending ||
    isCreateLocationPending ||
    isDeleteJobTitlePending ||
    isDeleteJobTypePending ||
    isDeleteLocationPending;

  const [localStoragePreference, setLocalStoragePreference] =
    useLocalStorage<boolean>('setPreference', false);
  useEffect(() => {
    if (!isCompletePreferenceForm) {
      setLocalStoragePreference(false);
    }
  }, [isCompletePreferenceForm]);
  return (
    <div className='flex flex-col gap-10'>
      {(!localStoragePreference || !isCompletePreferenceForm) && (
        <div className='relative w-full rounded-lg bg-muted p-6'>
          {/* {isCompletePreferenceForm && (
            <div className='absolute right-[-4px] top-[-4px]'>
              <XCircle
                onClick={() => {
                  setLocalStoragePreference(true);
                }}
                className='h-5 w-5 cursor-pointer text-muted-foreground'
              />
            </div>
          )} */}
          <div className='flex flex-col gap-2'>
            <div className='text-xl font-medium text-yellow-600'>
              🔒 Complete Your Profile to Unlock More Job Matches!
            </div>
            <div className='text-md text-muted-foreground'>
              To increase your chances of finding the perfect job, complete your
              profile now. It takes only a few minutes and will help us match
              you with the best opportunities.
            </div>
            <div className='grid grid-cols-2 gap-2 mt-4'>
                <div className='col-span-2'>
                  <div>
                    <Label>Preferred Travel Preference</Label>
                    <Select
                      onValueChange={(
                        value: z.infer<typeof travelPreferrenceSchema>,
                      ) => {
                        handleTravelPreferenceChange(value);
                        setTravelPreference(value);
                      }}
                      value={travelPreference}
                    >
                      <SelectTrigger id='travel_preference'>
                        <SelectValue placeholder='Select preferred travel preference' />
                      </SelectTrigger>
                      <SelectContent>
                        {TRAVEL_PREFERENCES.map((item) => (
                          <SelectItem key={item} value={item}>
                            {capitalizeFirstLetter(item.split('-').join(' '))}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className='col-span-2'>
                  <div>
                    <Label>Preferred Job Types</Label>
                    <UIMultiSelect
                      onDelete={(value) => {
                        deletePreferredJobTypes({
                          job_type: value as z.infer<typeof jobTypesSchema>,
                        });
                      }}
                      listItems={JOB_TYPES.map((item) => ({
                        label: capitalizeFirstLetter(item),
                        value: item,
                      }))}
                      onChange={(_values, value) => {
                        createPreferredJobTypes({
                          job_type: value as z.infer<typeof jobTypesSchema>,
                        });
                      }}
                      defaultValue={
                        preferredJobTypes.map(
                          (item) => item.job_type,
                        ) as string[]
                      }
                      level='Job Types'
                    />
                  </div>
                </div>
                <div className='col-span-2'>
                  <div>
                    <Label>Preferred Job Titles</Label>
                    <UIMultiSelect
                      onDelete={(value) => {
                        deletePreferredJobTitles({
                          job_title: value as z.infer<typeof jobTitlesSchema>,
                        });
                      }}
                      listItems={JOB_TITLES.map((item) => ({
                        label: capitalizeFirstLetter(item),
                        value: item,
                      }))}
                      onChange={(_values, value) => {
                        createPreferredJobTitles({
                          job_title: value as z.infer<typeof jobTitlesSchema>,
                        });
                      }}
                      defaultValue={
                        preferredJobTitle.map(
                          (item) => item.job_title,
                        ) as string[]
                      }
                      level='Job Titles'
                    />
                  </div>
                </div>
                <div className='col-span-2'>
                  <div>
                    <Label>Preferred Locations</Label>
                    <UIMultiSelect
                      onDelete={(value) => {
                        deletePreferredLocations({
                          location_id: value,
                        });
                      }}
                      listItems={locationList.map((item) => ({
                        label: capitalizeFirstLetter(item.level),
                        value: item.id,
                      }))}
                      onChange={(_values, value) => {
                        createPreferredLocations({
                          location_id: value,
                        });
                      }}
                      defaultValue={preferredLocations.map(
                        (item) => item.location_id,
                      )}
                      level='Preferred Locations'
                    />
                  </div>
                </div>
                {isCompletePreferenceForm && (
            <div className='col-span-2 flex items-center gap-4 '>
              <Button onClick={() => {
                  setLocalStoragePreference(true);
                }}>
               
              </Button>
              <div className='hidden'>
                  <span className='text-muted-foreground'>
                    {isSaving ? 'Saving...' : ''}
                  </span>
                  <p>
                    {!isSaving && isCompletePreferenceForm
                      ? 'Preference Complete : ✅ '
                      : ''}
                  </p>
                </div>
            </div>
          )}
              </div>
          </div>
        </div>
      )}
      {localStoragePreference && isCompletePreferenceForm && (
        <WaitingForMatch />
      )}
    </div>
  );
}

export default PreferenceForm;
