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
});
function UserSignIn() {
  const router = useRouter();
  const { mutateAsync } = api.user.check.useMutation();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const {
    control,
    formState: { isDirty, isSubmitting },
    setError,
  } = form;

  async function onSubmitForm(data: z.infer<typeof schema>) {
    try {
      const res = await mutateAsync({ email: data.email, role: 'nurse' });
      if (res) {
        await nurseSignIn({ email: data.email });
      }
    } catch (error) {
      setError('email', { message: 'User does not exist' });
    }
  }

  const nurseSignIn = async ({ email }: { email: string }) => {
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
      },
    });
    if (error) {
      toast({
        variant: 'destructive',
        title: error.message,
      });
    } else {
      router.push(`/auth/check-email?email=${encodeURI(email)}`);
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
          <Button
            type='submit'
            className='w-full'
            disabled={!isDirty || isSubmitting}
          >
            <div className='flex items-center gap-2'>
              {isSubmitting && <Loader />}
              <span>
                {isSubmitting ? 'Sending...' : 'Get Magic Link to Sign In'}
              </span>
            </div>
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default UserSignIn;
