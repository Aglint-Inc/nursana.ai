import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { useUserData } from '@/authenicated/hooks/useUserData';
import { Badge } from '@/components/ui/badge';
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
import { capitalizeFirstLetter } from '@/utils/utils';

import { JOB_TITLES, SALARY_RANGES } from '../constant';
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

export default function ViewProfileDetails({
  setEdit,
}: {
  setEdit: (_edit: boolean) => void;
}) {
  const { user } = useUserData();

  console.log(user);
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

  const { control } = form;

  if (!user) {
    return null;
  }
  return (
    <Form {...form}>
      <form className='w-full'>
        <Card className='w-full'>
          <CardHeader className='p-4'>
            <div className='flex flex-row items-center justify-between'>
              <CardTitle className='text-lg font-medium'>
                Basic Information
              </CardTitle>
              <Button
                onClick={() => setEdit(true)}
                type='button'
                variant='outline'
                size={'sm'}
              >
                Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent className='p-4'>
            <div className='grid grid-cols-2 gap-6'>
              <FormField
                name='first_name'
                control={control}
                render={({ field: { value } }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-normal text-muted-foreground'>
                      First Name
                    </FormLabel>
                    <FormControl>
                      <p className='text-md'>{value || '--'}</p>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='last_name'
                control={control}
                render={({ field: { value } }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-normal text-muted-foreground'>
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <p>{value || '--'}</p>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='phone_number'
                control={control}
                render={({ field: { value } }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-normal text-muted-foreground'>
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <p>{value || '--'}</p>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='job_title'
                control={control}
                render={({ field: { value } }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-normal text-muted-foreground'>
                      Current Job Title
                    </FormLabel>
                    <FormControl>
                      {
                        <p>
                          {JOB_TITLES.find((x) => x?.value === value)?.label ??
                            '--'}
                        </p>
                      }
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='expected_salary'
                control={control}
                render={({ field: { value } }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-normal text-muted-foreground'>
                      Expected Salary
                    </FormLabel>
                    <FormControl>
                      <p>
                        {SALARY_RANGES.find((x) => x?.value === value)?.label ??
                          '--'}
                      </p>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name='job_type'
                control={control}
                render={({ field: { value } }) => (
                  <FormItem>
                    <FormLabel className='text-sm font-normal text-muted-foreground'>
                      Job Types
                    </FormLabel>
                    <FormControl>
                      <div className='flex flex-wrap gap-1'>
                        {value && value.length > 0
                          ? value.map((item, index) => {
                              return (
                                <Badge
                                  key={index}
                                  variant='secondary'
                                  className='rounded-md text-sm font-normal'
                                >
                                  {capitalizeFirstLetter(
                                    item.split('-').join(' '),
                                  )}
                                </Badge>
                              );
                            })
                          : '--'}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='col-span-2'>
                <FormField
                  name='preferred_job_titles'
                  control={control}
                  render={({ field: { value } }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-normal text-muted-foreground'>
                        Preferred Job Titles
                      </FormLabel>
                      <FormControl>
                        <div className='flex flex-wrap gap-1'>
                          {value && value.length > 0
                            ? value.map((item, index) => {
                                return (
                                  <Badge
                                    key={index}
                                    variant='secondary'
                                    className='rounded-md text-sm font-normal'
                                  >
                                    {capitalizeFirstLetter(
                                      item.split('-').join(' '),
                                    )}
                                  </Badge>
                                );
                              })
                            : '--'}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='col-span-2'>
                <FormField
                  name='preferred_locations'
                  control={control}
                  render={({ field: { value } }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-normal text-muted-foreground'>
                        Preferred Locations
                      </FormLabel>
                      <FormControl>
                        <div className='flex flex-wrap gap-1'>
                          {value && value.length > 0
                            ? value.map((item, index) => {
                                return (
                                  <Badge
                                    key={index}
                                    variant='secondary'
                                    className='rounded-md text-sm font-normal'
                                  >
                                    {capitalizeFirstLetter(
                                      item.split('-').join(' '),
                                    )}
                                  </Badge>
                                );
                              })
                            : '--'}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='col-span-2'>
                <FormField
                  name='travel_preference'
                  control={control}
                  render={({ field: { value } }) => (
                    <FormItem>
                      <FormLabel className='text-sm font-normal text-muted-foreground'>
                        Preferred Travel Preference
                      </FormLabel>
                      <FormControl>
                        <div className='flex flex-wrap gap-1'>
                          {value && value.length > 0
                            ? value.map((item, index) => {
                                return (
                                  <Badge
                                    key={index}
                                    variant='secondary'
                                    className='rounded-md text-sm font-normal'
                                  >
                                    {capitalizeFirstLetter(
                                      item.split('-').join(' '),
                                    )}
                                  </Badge>
                                );
                              })
                            : '--'}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
