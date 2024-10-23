// import { useForm } from 'react-hook-form';
// import { z } from 'zod';

// import { useUserData } from '@/applicant/hooks/useUserData';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form';
// import { capitalizeFirstLetter } from '@/utils/utils';

// import { JOB_TITLES, SALARY_RANGES } from '../constant';
// export const userProfileSchema = z.object({
//   first_name: z.string().min(2, 'First name is required'),
//   last_name: z.string().min(1, 'Last name is required').nullable().optional(),
//   phone_number: z.string().min(10, 'Phone number must be at least 10 digits'),
//   preferred_job_titles: z.array(z.string()).nullish().optional(),
//   preferred_locations: z.array(z.string()).nullish().optional(),
//   travel_preference: z.array(z.string()).nullish().optional(),
//   expected_salary: z.string().nullable(),
//   job_title: z.string().nullable(),
//   job_type: z.array(z.string()).nullable(),
// });

// type ProfileData = z.infer<typeof userProfileSchema>;

// export default function ViewProfileDetails({
//   setEdit,
// }: {
//   setEdit: (_edit: boolean) => void;
// }) {
//   const { user } = useUserData();

//   const form = useForm<ProfileData>();

//   const { control } = form;

//   if (!user) {
//     return null;
//   }
//   return (
//     <Form {...form}>
//       <form className='w-full'>
//         <Card className='w-full'>
//           <CardHeader className='p-4'>
//             <div className='flex flex-row items-center justify-between'>
//               <CardTitle className='text-lg font-medium'>
//                 Basic Information
//               </CardTitle>
//               <Button
//                 onClick={() => setEdit(true)}
//                 type='button'
//                 variant='outline'
//                 size={'sm'}
//               >
//                 Edit
//               </Button>
//             </div>
//           </CardHeader>
//           <CardContent className='p-4 pt-0'>
//             <div className='grid grid-cols-2 gap-6'>
//               <FormField
//                 name='first_name'
//                 control={control}
//                 render={() => (
//                   <FormItem>
//                     <FormLabel className='text-sm font-normal text-muted-foreground'>
//                       First Name
//                     </FormLabel>
//                     <FormControl>
//                       <p className='text-md'>{user?.first_name || '--'}</p>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 name='last_name'
//                 control={control}
//                 render={() => (
//                   <FormItem>
//                     <FormLabel className='text-sm font-normal text-muted-foreground'>
//                       Last Name
//                     </FormLabel>
//                     <FormControl>
//                       <p>{user?.last_name || '--'}</p>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 name='phone_number'
//                 control={control}
//                 render={() => (
//                   <FormItem>
//                     <FormLabel className='text-sm font-normal text-muted-foreground'>
//                       Phone Number
//                     </FormLabel>
//                     <FormControl>
//                       <p>{user?.phone_number || '--'}</p>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 name='job_title'
//                 control={control}
//                 render={() => (
//                   <FormItem>
//                     <FormLabel className='text-sm font-normal text-muted-foreground'>
//                       Current Job Title
//                     </FormLabel>
//                     <FormControl>
//                       {
//                         <p>
//                           {JOB_TITLES.find((x) => x?.value === user?.job_title)
//                             ?.label ?? '--'}
//                         </p>
//                       }
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 name='expected_salary'
//                 control={control}
//                 render={() => (
//                   <FormItem>
//                     <FormLabel className='text-sm font-normal text-muted-foreground'>
//                       Expected Salary
//                     </FormLabel>
//                     <FormControl>
//                       <p>
//                         {SALARY_RANGES.find(
//                           (x) => x?.value === user?.expected_salary,
//                         )?.label ?? '--'}
//                       </p>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 name='job_type'
//                 control={control}
//                 render={() => (
//                   <FormItem>
//                     <FormLabel className='text-sm font-normal text-muted-foreground'>
//                       Job Types
//                     </FormLabel>
//                     <FormControl>
//                       <div className='flex flex-wrap gap-1'>
//                         {user.job_type && user.job_type.length > 0
//                           ? user.job_type.map((item, index) => {
//                               return (
//                                 <Badge
//                                   key={index}
//                                   variant='secondary'
//                                   className='rounded-md text-sm font-normal'
//                                 >
//                                   {capitalizeFirstLetter(
//                                     item.split('-').join(' '),
//                                   )}
//                                 </Badge>
//                               );
//                             })
//                           : '--'}
//                       </div>
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <div className='col-span-2'>
//                 <FormField
//                   name='preferred_job_titles'
//                   control={control}
//                   render={() => (
//                     <FormItem>
//                       <FormLabel className='text-sm font-normal text-muted-foreground'>
//                         Preferred Job Titles
//                       </FormLabel>
//                       <FormControl>
//                         <div className='flex flex-wrap gap-1'>
//                           {user.preferred_job_titles &&
//                           user.preferred_job_titles.length > 0
//                             ? user.preferred_job_titles.map((item, index) => {
//                                 return (
//                                   <Badge
//                                     key={index}
//                                     variant='secondary'
//                                     className='rounded-md text-sm font-normal'
//                                   >
//                                     {capitalizeFirstLetter(
//                                       item.split('-').join(' '),
//                                     )}
//                                   </Badge>
//                                 );
//                               })
//                             : '--'}
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <div className='col-span-2'>
//                 <FormField
//                   name='preferred_locations'
//                   control={control}
//                   render={() => (
//                     <FormItem>
//                       <FormLabel className='text-sm font-normal text-muted-foreground'>
//                         Preferred Locations
//                       </FormLabel>
//                       <FormControl>
//                         <div className='flex flex-wrap gap-1'>
//                           {user.preferred_locations &&
//                           user.preferred_locations.length > 0
//                             ? user.preferred_locations.map((item, index) => {
//                                 return (
//                                   <Badge
//                                     key={index}
//                                     variant='secondary'
//                                     className='rounded-md text-sm font-normal'
//                                   >
//                                     {capitalizeFirstLetter(
//                                       item.split('-').join(' '),
//                                     )}
//                                   </Badge>
//                                 );
//                               })
//                             : '--'}
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//               <div className='col-span-2'>
//                 <FormField
//                   name='travel_preference'
//                   control={control}
//                   render={() => (
//                     <FormItem>
//                       <FormLabel className='text-sm font-normal text-muted-foreground'>
//                         Preferred Travel Preference
//                       </FormLabel>
//                       <FormControl>
//                         <div className='flex flex-wrap gap-1'>
//                           {user.travel_preference &&
//                           user.travel_preference.length > 0
//                             ? user.travel_preference.map((item, index) => {
//                                 return (
//                                   <Badge
//                                     key={index}
//                                     variant='secondary'
//                                     className='rounded-md text-sm font-normal'
//                                   >
//                                     {capitalizeFirstLetter(
//                                       item.split('-').join(' '),
//                                     )}
//                                   </Badge>
//                                 );
//                               })
//                             : '--'}
//                         </div>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </form>
//     </Form>
//   );
// }

import React from 'react';

function ViewProfileDetails() {
  return <div>ViewProfileDetails</div>;
}

export default ViewProfileDetails;
