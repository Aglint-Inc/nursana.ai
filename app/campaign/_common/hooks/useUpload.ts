import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { api } from 'trpc/client';

import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/utils/supabase/client';

import { type FormCampaign } from '../types';
import { useCampaign } from './useCampaign';

export const useUploadCampaign = () => {
  const { toast } = useToast();
  const { data } = useCampaign();
  const router = useRouter();
  const [form, setForm] = useState<FormCampaign>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    file: null,
    role: 'nurse',
  });
  const searchParams = useSearchParams();
  const campaign_code = searchParams.get('campaign_code') as string;
  const [saving, setSaving] = useState(false);

  const { mutateAsync: createUser } = api.user.create.useMutation();
  const { mutateAsync: createInterview } =
    api.user.create_interview.useMutation();

  const { mutateAsync } = api.campaign.check_user.useMutation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (form.file && form.role && form.first_name && form.email) {
      try {
        setSaving(true);

        const resCheckUser = await mutateAsync({
          campaign_id: data?.id,
          email: form.email,
        });

        if (resCheckUser.resume?.id) {
          return toast({
            description: 'You have already applied for this campaign',
            variant: 'destructive',
          });
        }

        let userId: string | null = null;

        if (!resCheckUser.user?.id) {
          const resUser = await createUser({
            email: form.email,
            first_name: form.first_name,
            last_name: form.last_name,
            role: 'applicant',
            job_title: form.role,
          });
          if (resUser.error)
            throw new Error(resUser.error.message || resUser.error.code);
          userId = resUser.data.user?.id;
        } else {
          userId = resCheckUser.user.id;
        }

        const fileExt = form.file.name.split('.').pop();
        const fileName = `resumes/${userId}_${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('resumes')
          .upload(fileName, form.file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from('resume').getPublicUrl(fileName);

        const res = await createInterview({
          campaign_code,
          resume_url: publicUrl,
          userId,
        });

        if (res?.id) {
          const { error } = await supabase.auth.signInWithOtp({
            email: form.email,
            options: {
              emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm?interview_id=${res.id}`, 
            },
          });
          if (error) {
            throw new Error('Error creating interview');
          }

          router.push('/auth/check-email?type=interview');
          toast({
            description:
              'Interview link has been sent to your email. Please check your inbox.',
            variant: 'default',
          });
        } else {
          throw new Error('Error creating interview');
        }

        setForm({
          first_name: '',
          last_name: '',
          email: '',
          phone: '',
          file: null,
          role: 'nurse',
        });
        
      } catch (error) {
        console.log(error);
        toast({
          description:
            error.message ?? 'An error occurred. Please try again later.',
          variant: 'destructive',
        });
      } finally {
        setSaving(false);
      }
    }
  };

  return { handleSubmit, saving, form, setForm };
};
