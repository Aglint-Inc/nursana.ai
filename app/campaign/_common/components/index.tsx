'use client';

import UISelectDropDown from '@/common/components/UISelectDropDown';
import UITextField from '@/common/components/UITextField';
import { capitalize } from '@/common/utils/capitalize';
import Footer from '@/components/footer';
import NursanaLogo from '@/components/nursana-logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

import Section from '../../../../components/section';
import { useUploadCampaign } from '../hooks/useUpload';
import { type Role } from '../types';
import ResumeUpload from './ResumeUpload';

export default function FormCampaign() {
  const { form, setForm, saving, handleSubmit } = useUploadCampaign();

  return (
    <Section>
      <div className='flex h-[calc(100vh-72px)] w-full flex-col items-center gap-8'>
        <div className='mt-6 flex max-w-screen-xl flex-col items-center gap-1'>
          <NursanaLogo />
          <h1 className='mt-4 text-2xl font-medium'>
            Let Nursana&apos;s AI find your next opportunity.
          </h1>
          <h1 className='text-2xl font-medium'>Get started now!</h1>
        </div>

        <Card className='max-w-lg bg-muted'>
          <CardContent className='mt-6'>
            <form onSubmit={handleSubmit}>
              <div className='flex flex-col gap-8'>
                <div className='flex w-full flex-row gap-4'>
                  <UISelectDropDown
                    disabled={saving}
                    fullWidth
                    label='Choose your job title'
                    menuOptions={['nurse', 'doctor', 'therapist'].map(
                      (role) => ({
                        name: capitalize(role),
                        value: role,
                      }),
                    )}
                    onValueChange={(val: Role) =>
                      setForm({ ...form, role: val })
                    }
                    value={form.role}
                  />
                  <UITextField
                    disabled={saving}
                    fullWidth
                    label='Email'
                    placeholder='Enter your email'
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                    }}
                  />
                </div>
                <div className='flex w-full flex-row gap-4'>
                  <UITextField
                    disabled={saving}
                    fullWidth
                    label='First Name'
                    placeholder='Enter your first name'
                    value={form.first_name}
                    onChange={(e) => {
                      setForm({ ...form, first_name: e.target.value });
                    }}
                  />
                  <UITextField
                    disabled={saving}
                    fullWidth
                    label='Last Name'
                    placeholder='Enter your last name'
                    value={form.last_name}
                    onChange={(e) => {
                      setForm({ ...form, last_name: e.target.value });
                    }}
                  />
                </div>
                <ResumeUpload
                  form={form}
                  saving={saving}
                  setForm={setForm}
                  key={'resume-upload'}
                />
              </div>

              <Button
                className='mt-4 w-full'
                type='submit'
                disabled={
                  !form.email || !form.role || !form.first_name || !form.file
                }
              >
                Get Interview Link
              </Button>
            </form>
          </CardContent>
          <CardFooter className='flex flex-col items-center'>
            <p className='mt-4 text-sm text-muted-foreground'>
              Already have an account?{' '}
              <a
                href='/auth/sign-in'
                className='text-card-foreground underline'
              >
                Login here
              </a>
              .
            </p>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </Section>
  );
}
