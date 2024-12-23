'use client';

import {
  JOB_TITLES,
  NURSE_LICENSE,
} from 'app/(authenticated)/(applicant)/profile/_common/constant';
import Image from 'next/image';
import Link from 'next/link';

import { Loader } from '@/app/components/Loader';
import { UIMultiSelect } from '@/app/components/UIMultiSelect';
import UISelectDropDown from '@/app/components/UISelectDropDown';
import UITextField from '@/app/components/UITextField';
import Footer from '@/components/footer';
import NursanaLogo from '@/components/nursana-logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { capitalizeFirstLetter } from '@/utils/utils';

import Section from '../../../../components/section';
import { useUploadCampaign } from '../hooks/useUpload';
import ResumeUpload from './ResumeUpload';

export default function FormCampaign() {
  const {
    form,
    saving,
    handleSubmit,
    isAppoloCampaign,
    isAppoloCampaignLoading,
  } = useUploadCampaign();

  const {
    control,
    setValue,
    getValues,
    clearErrors,
    formState: { isDirty },
  } = form;

  if (isAppoloCampaignLoading) {
    return (
      <div className='fixed h-screen w-screen bg-white'>
        <Loader className='text-purple-600' />
      </div>
    );
  }

  return (
    <Section>
      <div className='flex w-full flex-col items-center justify-center gap-8 md:p-4 lg:p-8'>
        <div className='my-8 grid w-full overflow-hidden rounded-xl border-border md:my-16 md:max-w-xl md:border lg:max-w-5xl lg:grid-cols-2'>
          <Form {...form}>
            <form
              className='mb-4 w-full px-4'
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <Card className='max-w-full border-none bg-white shadow-none'>
                <CardContent className='mt-6 p-0'>
                  <div className='mt-6 flex max-w-screen-xl flex-col gap-1'>
                    <NursanaLogo />
                    <h1 className='mb-4 mt-4 text-2xl font-medium'>
                      Let Nursana&apos;s AI find your next opportunity.{' '}
                      <span className='text-purple-500'>Get started now!</span>
                    </h1>
                  </div>
                  <div className='flex flex-col gap-4'>
                    <div className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2'>
                      <FormField
                        control={control}
                        name='first_name'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel required>First Name</FormLabel>
                            <FormControl>
                              <UITextField
                                disabled={saving}
                                fullWidth
                                placeholder='Enter your first name'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={control}
                        name='last_name'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <UITextField
                                disabled={saving}
                                fullWidth
                                placeholder='Enter your last name'
                                {...field}
                                value={field.value || ''}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div>
                      <FormField
                        control={control}
                        name='email'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel required>Email</FormLabel>
                            <FormControl>
                              <UITextField
                                disabled={saving}
                                fullWidth
                                placeholder='Enter your email'
                                type='email'
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={control}
                      name='role'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <UISelectDropDown
                              disabled={saving}
                              fullWidth
                              menuOptions={JOB_TITLES.map((role) => ({
                                name: role.label,
                                value: role.value,
                              }))}
                              onValueChange={(
                                val: (typeof JOB_TITLES)[0]['value'],
                              ) => {
                                clearErrors('role');
                                setValue('role', val);
                              }}
                              value={field.value}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name='licenses'
                      render={() => (
                        <FormItem>
                          <FormLabel>Licenses</FormLabel>
                          <FormControl>
                            <UIMultiSelect
                              listItems={NURSE_LICENSE.map((license) => ({
                                label: capitalizeFirstLetter(license.label),
                                value: license.value,
                              }))}
                              level='license'
                              onChange={(values, _value) => {
                                setValue(
                                  'licenses',
                                  JSON.stringify(values) as string,
                                );
                              }}
                              onDelete={(value) => {
                                if (getValues('licenses')) {
                                  setValue(
                                    'licenses',
                                    JSON.stringify(
                                      JSON.parse(
                                        getValues('licenses')!,
                                      )?.filter((v: any) => v !== value),
                                    ),
                                  );
                                }
                              }}
                              defaultValue={JSON.parse(getValues('licenses')!)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name='image'
                      render={({ field: { value } }) => (
                        <FormItem>
                          <FormLabel required>Upload Resume</FormLabel>
                          <FormControl>
                            <ResumeUpload
                              saving={saving}
                              onChange={(file: File | null) => {
                                if (file) {
                                  setValue('image', file);
                                  clearErrors('image');
                                } else {
                                  //@ts-ignore
                                  setValue('image', null);
                                  clearErrors('image');
                                }
                              }}
                              value={value}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className='flex'>
                      <FormField
                        control={form.control}
                        name='terms_accepted'
                        render={({ field }) => (
                          <FormItem className='flex flex-row items-start gap-3 space-y-0'>
                            <FormControl>
                              <Checkbox
                                checked={field.value === 'true' ? true : false}
                                onCheckedChange={(value) => {
                                  field.onChange(String(value));
                                }}
                              />
                            </FormControl>
                            <div className='space-y-1 leading-none'>
                              <FormLabel className='font-normal'>
                                I accept{' '}
                                <Link
                                  href='/terms'
                                  target='_blank'
                                  className='underline'
                                >
                                  terms of service
                                </Link>
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                    <Button
                      className='w-full'
                      type='submit'
                      disabled={
                        isAppoloCampaign
                          ? false
                          : !isDirty ||
                            saving ||
                            form.getValues('terms_accepted') === 'false'
                      }
                    >
                      <div className='flex items-center gap-2'>
                        {saving && <Loader />}
                        <span>Get Interview Link</span>
                      </div>
                    </Button>
                  </div>
                </CardContent>
                <CardFooter className='mt-4 flex p-0'>
                  <p className='text-sm text-muted-foreground'>
                    Already have an account?{' '}
                    <a
                      href='/auth/sign-in'
                      className='text-card-foreground underline'
                    >
                      Login
                    </a>
                    .
                  </p>
                </CardFooter>
              </Card>
            </form>
          </Form>
          <div className='relative hidden h-full w-full md:block'>
            <Image
              src={'/images/nurse-1.jpg'}
              layout='fill'
              alt='nurse'
              className='object-cover'
            />
          </div>
        </div>
      </div>
      <Footer />
    </Section>
  );
}
