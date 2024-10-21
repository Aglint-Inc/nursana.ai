'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  useUpdateUserData,
  useUserData,
} from '@/authenicated/hooks/useUserData';
import { UIMultiSelect } from '@/common/components/UIMultiSelect';
import UIPhoneInput from '@/common/components/UIPhoneInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  CITIES,
  JOB_TITLES,
  JOB_TYPES,
  SALARY_RANGES,
  TRAVEL_PREFERENCES,
} from '../constant';
export const userProfileSchema = z.object({
  first_name: z.string().min(2, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required').nullable().optional(),
  phone_number: z.string().min(10, 'Phone number must be at least 10 digits'),
  preferred_job_titles: z.array(z.string()).nullish().optional(),
  preferred_locations: z.array(z.string()).nullish().optional(),
  travel_preference: z.array(z.string()).nullish().optional(),
  expected_salary: z.string().nullable(),
  job_title: z.string().nullable(),
  job_type: z.array(z.string()).nullable(),
});

type ProfileData = z.infer<typeof userProfileSchema>;

export default function EditProfileForm() {
  const { user } = useUserData();
  const { updateUserDetails, isPending } = useUpdateUserData();
  const form = useForm<ProfileData>({
    resolver: zodResolver(userProfileSchema),
    defaultValues: {
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      phone_number: user?.phone_number || '',
      preferred_job_titles: user?.preferred_job_titles || [],
      preferred_locations: user?.preferred_locations || [],
      travel_preference: user?.travel_preference || [],
      expected_salary: user?.expected_salary || '',
      job_title: user?.job_title || '',
      job_type: user?.job_type || [],
    },
  });
  const { control, register, setValue, clearErrors } = form;
  const onSubmitForm = async (data: ProfileData) => {
    await updateUserDetails({
      ...data,
      last_name: data.last_name || null,
    });
  };

  return (
    <Form {...form}>
      <form className='w-full' onSubmit={form.handleSubmit(onSubmitForm)}>
        <Card className='w-full'>
          <CardHeader>
            <CardTitle>Edit Profile Information</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-3 gap-4'>
              <div className='space-y-2'>
                <FormField
                  control={control}
                  name='first_name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          id='first_name'
                          placeholder='Please enter your first name'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='space-y-2'>
                <FormField
                  control={control}
                  name='last_name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          id='last_name'
                          placeholder='Please enter your last name'
                          {...field}
                          value={field.value || ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='space-y-2'>
                <FormField
                  control={control}
                  name='phone_number'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <UIPhoneInput {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <FormField
                  control={control}
                  name='job_title'
                  render={({ field: { value } }) => (
                    <FormItem>
                      <FormLabel>Current Job Title</FormLabel>
                      <FormControl>
                        <Select
                          {...register('job_title')}
                          onValueChange={(value) => {
                            clearErrors('job_title');
                            setValue('job_title', value);
                          }}
                          value={value || ''}
                        >
                          <SelectTrigger id='job_title'>
                            <SelectValue placeholder='Select current job title' />
                          </SelectTrigger>
                          <SelectContent>
                            {JOB_TITLES.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='space-y-2'>
                <FormField
                  control={control}
                  name='expected_salary'
                  render={({ field: { value } }) => (
                    <FormItem>
                      <FormLabel>Expected Salary</FormLabel>
                      <FormControl>
                        <Select
                          {...register('expected_salary')}
                          onValueChange={(value) => {
                            clearErrors('expected_salary');
                            setValue('expected_salary', value);
                          }}
                          value={value || ''}
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
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <FormField
                  control={control}
                  name='job_type'
                  render={({ field: { value } }) => (
                    <FormItem>
                      <FormLabel>Job Types</FormLabel>
                      <FormControl>
                        <UIMultiSelect
                          listItems={JOB_TYPES}
                          onChange={(value) => {
                            clearErrors('job_type');
                            setValue('job_type', value);
                          }}
                          defaultValue={value ?? []}
                          level='Job Types'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='space-y-2'>
                <FormField
                  control={control}
                  name='preferred_job_titles'
                  render={({ field: { value } }) => (
                    <FormItem>
                      <FormLabel>Preferred Job Titles</FormLabel>
                      <FormControl>
                        <UIMultiSelect
                          listItems={JOB_TITLES}
                          onChange={(value) =>
                            setValue('preferred_job_titles', value)
                          }
                          defaultValue={value ?? []}
                          level='Job Titles'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-2'>
                <FormField
                  control={control}
                  name='preferred_locations'
                  render={({ field: { value } }) => (
                    <FormItem>
                      <FormLabel>Preferred Locations</FormLabel>
                      <FormControl>
                        <UIMultiSelect
                          listItems={CITIES}
                          onChange={(value) =>
                            setValue('preferred_locations', value)
                          }
                          defaultValue={value ?? []}
                          level='Preferred Locations'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='space-y-2'>
                <FormField
                  control={control}
                  name='travel_preference'
                  render={({ field: { value } }) => (
                    <FormItem>
                      <FormLabel>Preferred Travel Preference</FormLabel>
                      <FormControl>
                        <UIMultiSelect
                          listItems={TRAVEL_PREFERENCES}
                          onChange={(value) =>
                            setValue('travel_preference', value)
                          }
                          defaultValue={value ?? []}
                          level='Travel Preferences'
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className='flex justify-end gap-4'>
              <div className='flex gap-2'>
                <Button disabled={isPending} type='submit'>
                  {isPending ? 'Saving' : 'Save'}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
