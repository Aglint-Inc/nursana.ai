'use client';

import { useToast } from 'hooks/use-toast';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { api } from 'trpc/client';

import Footer from '@/components/footer';
import NursanaLogo from '@/components/nursana-logo';
import Section from '@/components/section';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/utils/supabase/client';

export default function SignIn() {
  const [role, setRole] = useState<'nurse' | 'company'>('nurse');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const { mutateAsync } = api.user.check.useMutation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await mutateAsync({ email, role });
      if (res) {
        if (role === 'nurse') {
          await nurseSignIn({ email });
        } else {
          await companySignIn({ email, password });
        }
      }
    } catch (error) {
      toast({ variant: 'destructive', title: error.message });
    } finally {
      setIsLoading(false);
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
      throw new Error(error.message);
    } else {
      router.push('/auth/check-email');
    }
  };

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
      throw new Error(error.message);
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <Section>
      <div className='flex min-h-screen flex-col items-center justify-between pt-6 '>
        <NursanaLogo />
        <div className='grid h-[500px] w-[800px] grid-cols-2 border border-gray-200 rounded-lg overflow-hidden bg-white'>
          <div className='flex flex-col items-center justify-center'>
            <div className='mb-6 text-xl font-medium'>Sign In to Nursana</div>
            <Tabs
              defaultValue='nurse'
              onValueChange={(value) => setRole(value as 'nurse' | 'company')}
              className='w-[300px]'
            >
              <TabsList className='mb-4 grid w-full grid-cols-2'>
                <TabsTrigger value='nurse'>Individual</TabsTrigger>
                <TabsTrigger value='company'>Company</TabsTrigger>
              </TabsList>
              <TabsContent value='nurse'>
                <form onSubmit={handleSubmit} className='space-y-4'>
                  <div className='flex flex-col gap-2'>
                    <label
                      htmlFor='email'
                      className='text-sm font-medium leading-none'
                    >
                      Email
                    </label>
                    <Input
                      id='email'
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='Enter your email'
                      required
                    />
                  </div>
                  <Button type='submit' className='w-full' disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Get Magic Link to Sign In'}
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value='company'>
                <form onSubmit={handleSubmit} className='space-y-4'>
                  <div className='flex flex-col gap-2'>
                    <label
                      htmlFor='email'
                      className='text-sm font-medium leading-none'
                    >
                      Email
                    </label>
                    <Input
                      id='email'
                      type='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder='Enter your email'
                      required
                    />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label
                      htmlFor='password'
                      className='text-sm font-medium leading-none'
                    >
                      Password
                    </label>
                    <Input
                      id='password'
                      type='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder='Enter your password'
                      required
                    />
                  </div>
                  <Button type='submit' className='w-full' disabled={isLoading}>
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </div>
          <div className='h-[500px] bg-gray-100'>
              <Image alt='nursana' src={'/images/nurse-cover.jpg'}  objectFit='cover' width={400} height={500}/>
          </div>
        </div>

        <Footer />
      </div>
    </Section>
  );
}
