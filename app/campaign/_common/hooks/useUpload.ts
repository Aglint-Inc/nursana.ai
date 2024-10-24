import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from 'trpc/client';
import { z } from 'zod';

import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/utils/supabase/client';

import { useCampaign } from './useCampaign';
export const CampaignFormDataSchema = z.object({
  email: z.string().email(),
  role: z.enum(['nurse', 'doctor', 'therapist']),
  first_name: z.string().min(2, 'First name is required'),
  last_name: z.string().optional().nullable(),
  file: z.instanceof(File),
});

export type CampaignFormData = z.infer<typeof CampaignFormDataSchema>;
export const useUploadCampaign = () => {
  const { toast } = useToast();
  const { data: campaignData } = useCampaign();
  const router = useRouter();

  const form = useForm<CampaignFormData>({
    resolver: zodResolver(CampaignFormDataSchema),
    defaultValues: {
      email: '',
      role: 'nurse',
      first_name: '',
      last_name: '',
    },
  });
  const { getValues } = form;
  const searchParams = useSearchParams();
  const campaign_code = searchParams.get('campaign_code') as string;
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<{
    message: string;
    field: 'email' | 'file';
  } | null>(null);

  const { mutateAsync: createUser } = api.user.create.useMutation();
  const { mutateAsync: createInterview } =
    api.user.create_interview.useMutation();

  const { mutateAsync } = api.campaign.check_user.useMutation();

  const campaign_id = campaignData?.id;

  const handleSubmit = async () => {
    let uploadUrl = '';
    const bucketName = 'resumes';
    try {
      setSaving(true);

      const resCheckUser = await mutateAsync({
        campaign_id: campaignData?.id,
        email: getValues().email,
      });

      if (resCheckUser.resume?.id) {
        setError({
          message: 'User already exists',
          field: 'email',
        });
        return;
      }

      let userId: string | null = null;

      if (!resCheckUser.user?.id) {
        const resUser = await createUser({
          email: getValues().email,
          first_name: getValues().first_name,
          last_name: getValues().last_name || '',
          job_title: 'nurse-practitioner',
        });
        if (resUser.error)
          throw new Error(resUser.error.message || resUser.error.code);
        userId = resUser.data.user?.id;
      } else {
        userId = resCheckUser.user.id;
      }

      const fileExt = getValues().file.name.split('.').pop();
      const fileName = `${campaign_id}/${userId}_${Date.now()}.${fileExt}`;

      const { data, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, getValues().file, {
          cacheControl: '3600',
          upsert: false,
        });
      console.log({ data, uploadError });

      if (uploadError) {
        setError({
          message: uploadError.message,
          field: 'file',
        });
      }

      uploadUrl = fileName;

      const {
        data: { publicUrl },
      } = supabase.storage.from(bucketName).getPublicUrl(fileName);

      const res = await createInterview({
        campaign_code,
        resume_url: publicUrl,
        userId,
      });

      if (res?.id) {
        const { error } = await supabase.auth.signInWithOtp({
          email: getValues().email,
          options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/interview?id=${res.id}`,
          },
        });
        if (error) {
          throw new Error('Error creating interview');
        }
        router.push(
          '/auth/check-email?type=interview&email=' +
            encodeURI(getValues().email),
        );
      } else {
        throw new Error('Error creating interview');
      }
    } catch (error) {
      if (uploadUrl) {
        await supabase.storage.from(bucketName).remove([uploadUrl]);
      }
      toast({
        description:
          error.message ?? 'An error occurred. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return { handleSubmit, saving, error, form };
};
