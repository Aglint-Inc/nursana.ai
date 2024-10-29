'use client';
import {
  JOB_TITLES,
  JOB_TYPES,
  TRAVEL_PREFERENCES,
} from 'app/(authenticated)/(applicant)/profile/_common/constant';
import { debouncedAsync } from 'lib/debouncedAsync';
import { CheckCircle2 } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Label } from 'recharts';
import { api } from 'trpc/client';
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
import { Loader } from '@/common/components/Loader';
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
import { toast } from '@/hooks/use-toast';
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
  const { mutateAsync, data: addressSugg } =
    api.services.placesAutocomplete.useMutation({
      onError: (_err) => {
        toast({
          title: 'Some thing went wrong',
          variant: 'destructive',
        });
      },
    });

  const debouncedOnChangePlaceInput = useCallback(
    debouncedAsync(mutateAsync, 100),
    [],
  );
  const merged_locations = useMemo(() => {
    const temp: NonNullable<typeof addressSugg> = [
      ...(addressSugg ?? []),
      ...preferredLocations.map((l) => ({
        description: l.locations_list.level,
        place_id: l.place_id,
      })),
    ];
    const uniq_places: Record<string, NonNullable<typeof addressSugg>[0]> = {};
    temp.forEach((t) => {
      uniq_places[t.place_id] = t;
    });
    const merged: NonNullable<typeof addressSugg> = [];
    Object.values(uniq_places).forEach((t) => {
      merged.push(t);
    });

    return merged;
  }, [preferredLocations, addressSugg]);

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
            <div className='mt-4 grid grid-cols-2 gap-2'>
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
                      preferredJobTypes.map((item) => item.job_type) as string[]
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
                    onInputChnage={(str) => {
                      debouncedOnChangePlaceInput({
                        text_query: str,
                      });
                    }}
                    onDelete={(value) => {
                      deletePreferredLocations({
                        place_id: value,
                      });
                    }}
                    listItems={merged_locations.map((item) => ({
                      label: capitalizeFirstLetter(item.description),
                      value: item.place_id,
                    }))}
                    onChange={(_values, value) => {
                      const place = addressSugg?.find(
                        (p) => p.place_id === value,
                      );
                      if (!place) return;
                      createPreferredLocations({
                        maps_place_id: place.place_id,
                        place_description: place.description,
                      });
                    }}
                    defaultValue={preferredLocations.map(
                      (item) => item.place_id,
                    )}
                    level='Preferred Locations'
                  />
                </div>
              </div>
              {isCompletePreferenceForm && (
                <div className='col-span-2 flex items-center justify-between'>
                  <div className=''>
                    <span className='text-muted-foreground'>
                      {isSaving ? (
                        <div className='grid grid-cols-[max-content_1fr] items-center gap-2'>
                          <Loader />
                          <p>Saving preferences...</p>
                        </div>
                      ) : (
                        ''
                      )}
                    </span>
                    <p>
                      {!isSaving && isCompletePreferenceForm ? (
                        <div className='flex items-center gap-2 text-green-600'>
                          <CheckCircle2 size={16} />
                          <p>Preferences Saved</p>
                        </div>
                      ) : (
                        ''
                      )}
                    </p>
                  </div>
                  <Button
                    size={'sm'}
                    onClick={() => {
                      setLocalStoragePreference(true);
                    }}
                  >
                    Close
                  </Button>
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
