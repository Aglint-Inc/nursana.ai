'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { api } from 'trpc/client';

import { UIButton } from '@/common/components/UIButton';
import { UIPhoneInput } from '@/common/components/UIPhoneInput/PhoneInput';
import { UITextArea } from '@/common/components/UITextArea';
import UITextField from '@/common/components/UITextField';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/utils/supabase/client';

type Hospital = {
  name: string;
  address: string;
  contact_person: string;
  contact_email: string;
  contact_number: string;
};
type User = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};

export default function Signup() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [hospital, setHospital] = useState<Hospital>({
    name: '',
    address: '',
    contact_person: '',
    contact_email: '',
    contact_number: '',
  });
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });

  const { mutateAsync: createUser, isPending } =
    api.tenant.signup.useMutation();

  const handleSubmitUser = async () => {
    if (!user.email || !user.password || !user.first_name) return;

    const { data, error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
    });

    if (error || !data.user?.id) {
      return toast({ title: error?.message, variant: 'destructive' });
    }

    const res = await createUser({
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      userId: data.user?.id,
    });

    if (res.success) {
      router.push('?step=create-hospital');
    } else {
      toast({ title: 'Error in teant.signup', variant: 'destructive' });
    }
  };

  const { mutateAsync: updateHospital, isPending: isPendingHospital } =
    api.tenant.update_hospital.useMutation();
  const handleHospitalSubmit = async () => {
    if (!hospital.name || !hospital.contact_person || !hospital.contact_email)
      return;
    const { data } = await supabase.auth.getSession();

    if (!data?.session?.user?.id) {
      router.push('/tenant/sign-up');
      return toast({ title: 'User not found', variant: 'destructive' });
    }
    const res = await updateHospital({
      hospital_name: hospital.name,
      address: hospital.address,
      contact_email: hospital.contact_email,
      contact_person: hospital.contact_person,
      contact_number: hospital.contact_number,
      created_by: data.session?.user?.id,
      user_id: data?.session?.user?.id,
    });
    if (res.success) {
      await supabase.auth.refreshSession();
      router.push('/dashboard');
    } else {
      toast({ title: 'Error updating details', variant: 'destructive' });
    }
  };

  return (
    <div className='mx-auto mt-36 flex min-w-80 flex-col'>
      {searchParams.get('step') === 'create-hospital' ? (
        <div className='flex flex-col gap-4'>
          <div className='flex flex-row gap-4'>
            <UITextField
              fullWidth
              label='Hospital Name'
              placeholder='Ex: Apollo Hospital'
              onChange={(e) => {
                setHospital((pre) => ({
                  ...pre,
                  name: e.target.value,
                }));
              }}
              value={hospital.name}
            />
            <UITextField
              fullWidth
              label='Contact Person'
              placeholder='Ex: John Doe'
              onChange={(e) => {
                setHospital((pre) => ({
                  ...pre,
                  contact_person: e.target.value,
                }));
              }}
              value={hospital.contact_person}
            />
          </div>
          <div className='flex flex-row gap-4'>
            <UIPhoneInput
              fullWidth
              label='Contact Number'
              placeholder='Ex: 1234567890'
              onChange={(val) => {
                setHospital((pre) => ({
                  ...pre,
                  contact_number: val,
                }));
              }}
              value={hospital.contact_number}
            />

            <UITextField
              fullWidth
              label='Contact Email'
              placeholder='Ex: john@example.com'
              onChange={(e) => {
                setHospital((pre) => ({
                  ...pre,
                  contact_email: e.target.value,
                }));
              }}
              value={hospital.contact_email}
            />
          </div>
          <UITextArea
            label='Address'
            placeholder='Ex: 123, Main Street, New York'
            onChange={(e) => {
              setHospital((pre) => ({
                ...pre,
                address: e.target.value,
              }));
            }}
            value={hospital.address}
          />
          <UIButton
            isLoading={isPendingHospital}
            onClick={() => {
              handleHospitalSubmit();
            }}
          >
            Continue
          </UIButton>
        </div>
      ) : (
        <div>
          <h1 className='text-2xl font-medium'>Tenant Sign up</h1>
          <div className='mt-8 flex flex-col gap-2 [&>input]:mb-3'>
            <UITextField
              fullWidth
              label='Email'
              placeholder='Your email'
              type='email'
              onChange={(e) => {
                setUser((pre) => ({
                  ...pre,
                  email: e.target.value,
                }));
              }}
              value={user.email}
            />
            <UITextField
              fullWidth
              label='Password'
              placeholder='Your password'
              type='password'
              onChange={(e) => {
                setUser((pre) => ({
                  ...pre,
                  password: e.target.value,
                }));
              }}
              value={user.password}
            />
            <UITextField
              fullWidth
              label='First Name'
              placeholder='Ex: John'
              onChange={(e) => {
                setUser((pre) => ({
                  ...pre,
                  first_name: e.target.value,
                }));
              }}
              value={user.first_name}
            />
            <UITextField
              fullWidth
              label='Last Name'
              placeholder='Ex: Doe'
              onChange={(e) => {
                setUser((pre) => ({
                  ...pre,
                  last_name: e.target.value,
                }));
              }}
              value={user.last_name}
            />
            <UIButton
              isLoading={isPending}
              className='mt-4'
              onClick={() => {
                handleSubmitUser();
              }}
            >
              Sign up
            </UIButton>
          </div>
        </div>
      )}
    </div>
  );
}
