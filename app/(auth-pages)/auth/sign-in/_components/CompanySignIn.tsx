import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { api } from 'trpc/client';
import { z } from 'zod';

import { Loader } from '@/common/components/Loader';
import UITextField from '@/common/components/UITextField';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/utils/supabase/client';
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});
function CompanySignIn() {
  const router = useRouter();
  const { mutateAsync } = api.user.check.useMutation();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    control,
    formState: { isDirty, isSubmitting },
    setError,
  } = form;

  async function onSubmitForm(data: z.infer<typeof schema>) {
    try {
      const res = await mutateAsync({ email: data.email, role: 'company' });
      if (res) {
        await companySignIn({ email: data.email, password: data.password });
      }
    } catch (error) {
      setError('email', { message: 'Company does not exist' });
    }
  }

  const companySignIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Incorrect email or password',
      });
    } else {
      router.push(`/campaigns`);
    }
  };
  return (
    <Form {...form}>
      <form className='w-full' onSubmit={form.handleSubmit(onSubmitForm)}>
        <div className='flex flex-col gap-2'>
          <FormField
            control={control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Email</FormLabel>
                <FormControl>
                  <UITextField
                    fullWidth
                    placeholder='Enter your email'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel required>Password</FormLabel>
                <FormControl>
                  <UITextField
                    placeholder='Enter your password'
                    {...field}
                    type='password'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='w-full'
            disabled={!isDirty || isSubmitting}
          >
            <div className='flex items-center gap-2'>
              {isSubmitting && <Loader />}
              <span>{isSubmitting ? 'Signing In...' : 'Sign In'}</span>
            </div>
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CompanySignIn;
