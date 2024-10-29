'use client';
import { useEffect, useRef, useState } from 'react';
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
import { Loader } from '@/common/components/Loader';
import { UIMultiSelect } from '@/common/components/UIMultiSelect';
import UIPhoneInput from '@/common/components/UIPhoneInput';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useDebounce } from '@/hooks/use-debounce';
import { type userProfileSchema } from '@/server/api/routers/user/update';
import {
  type jobTitlesSchema,
  type jobTypesSchema,
  type travelPreferrenceSchema,
} from '@/supabase-types/zod-schema.types';
import { capitalizeFirstLetter } from '@/utils/utils';

import {
  JOB_TITLES,
  JOB_TYPES,
  SALARY_RANGES,
  TRAVEL_PREFERENCES,
} from '../constant';

type ProfileDataType = z.infer<typeof userProfileSchema>;
export default function EditProfileForm() {
  const { applicant_user } = useUserData();
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
  const isInitialRender = useRef(true);
  const phoneRef = useRef<HTMLInputElement>(null);

  const { updateUserDetails, isPending } = useUpdateUserData();
  const [firstName, setFirstName] = useState(
    applicant_user?.user.first_name || '',
  );
  const [lastName, setLastName] = useState(
    applicant_user?.user.last_name || '',
  );
  const [openToWork, setOpenToWork] = useState(
    applicant_user?.open_to_work || false,
  );
  const [phone, setPhone] = useState(applicant_user?.phone_number || null);
  const [salary, setSalary] = useState(
    (applicant_user?.salary_range as string) || '',
  );
  const [jobTitle, setJobTitle] = useState<z.infer<typeof jobTitlesSchema>>(
    (applicant_user?.job_title as any) || 'nurse-practitioner',
  );
  const [travelPreference, setTravelPreference] = useState<
    z.infer<typeof travelPreferrenceSchema>
  >(applicant_user?.preferred_travel_preference || 'no-travel');

  const onSubmitForm = async (data: ProfileDataType) => {
    try {
      await updateUserDetails({
        ...data,
        last_name: data.last_name || undefined,
        phone_number: data.phone_number || null,
      });
    } catch (error) {
      //
    }
  };
  const first_name = useDebounce(firstName, 1000);
  const last_name = useDebounce(lastName, 1000);
  const phone_number = useDebounce(phone, 1000);
  const salary_range = useDebounce(salary, 1000);
  const current_job_title = useDebounce(jobTitle, 1000);
  const preferred_travel_preference = useDebounce(travelPreference, 1000);
  const open_to_work = useDebounce(openToWork, 1000);

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    onSubmitForm({
      first_name,
      last_name,
      phone_number,
      salary_range,
      preferred_travel_preference,
      open_to_work,
      current_job_title,
    });
  }, [
    first_name,
    last_name,
    phone_number,
    salary_range,
    current_job_title,
    preferred_travel_preference,
    open_to_work,
  ]);
  return (
    <Card className='mb-[500px] w-full bg-gray-50'>
      <CardHeader className='p-4'>
        <div className='flex flex-row items-center justify-between'>
          <CardTitle className='text-lg font-medium'>
            Edit Basic Information
          </CardTitle>
          <span className='flex items-center text-muted-foreground'>
            {(isPending ||
              isCreateJobTitlePending ||
              isCreateJobTypePending ||
              isCreateLocationPending ||
              isDeleteJobTitlePending ||
              isDeleteJobTypePending ||
              isDeleteLocationPending) && (
              <>
                <Loader />
                <span className='ml-2 text-sm'>Saving</span>
              </>
            )}
          </span>
        </div>
      </CardHeader>
      <CardContent className='p-4 pt-0'>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <Label htmlFor=''>First Name</Label>
            <Input
              value={firstName || ''}
              id='first_name'
              placeholder='Please enter your first name'
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>

          <div>
            <Label>Last Name</Label>
            <Input
              id='last_name'
              placeholder='Please enter your last name'
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              value={lastName || ''}
            />
          </div>

          <div className='col-span-2 flex flex-row items-center gap-2'>
            <Label>Open to Work</Label>
            <Switch
              checked={openToWork}
              onCheckedChange={(value: boolean) => {
                setOpenToWork(value);
              }}
            />
          </div>

          <div>
            <Label>Phone Number</Label>
            <UIPhoneInput
              onChange={(value) => {
                setPhone(value);
              }}
              value={phone}
              name='phone_number'
              onBlur={() => {}}
              // @ts-expect-error
              ref={phoneRef}
            />
          </div>
          <div>
            <Label>Expected Salary</Label>
            <Select
              onValueChange={(value) => {
                setSalary(value);
              }}
              value={salary || ''}
            >
              <SelectTrigger id='expected_salary'>
                <SelectValue placeholder='Select expected salary' />
              </SelectTrigger>
              <SelectContent>
                {SALARY_RANGES.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='col-span-2'>
            <div>
              <Label>Current Job Title</Label>
              <Select
                onValueChange={(value: z.infer<typeof jobTitlesSchema>) => {
                  setJobTitle(value);
                }}
                value={jobTitle || ''}
              >
                <SelectTrigger id='job_title'>
                  <SelectValue placeholder='Select current job title' />
                </SelectTrigger>
                <SelectContent>
                  {JOB_TITLES.map((item) => (
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
              <Label>Preferred Travel Preference</Label>
              <Select
                onValueChange={(
                  value: z.infer<typeof travelPreferrenceSchema>,
                ) => {
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
                  preferredJobTitle.map((item) => item.job_title) as string[]
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
        </div>
      </CardContent>
    </Card>
  );
}
