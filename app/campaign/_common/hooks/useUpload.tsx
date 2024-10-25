import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from 'trpc/client';
import { type z } from 'zod';

import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/utils/supabase/client';
import { useZodFormData } from '@/utils/zod-form-data';

import { campaignFormDataSchema } from '../schema/upload';
import { useCampaign } from './useCampaign';

export const useUploadCampaign = () => {
  const { toast } = useToast();
  const { data: campaignData } = useCampaign();
  const [saving, setSaving] = useState(false);
  const router = useRouter();
  const utils = api.useUtils();

  const form = useZodFormData({
    schema: campaignFormDataSchema,
    defaultValues: {
      email: '',
      role: 'nurse-practitioner',
      first_name: '',
      last_name: '',
      campaign_id: campaignData?.id,
      user_id: null,
      terms_accepted: 'true',
    },
  });

  const { getValues } = form;

  useEffect(() => {
    if (form.getValues().image && getValues().image.name.split('.').pop()) {
      form.setValue(
        'fileExt',
        getValues().image.name.split('.').pop() as string,
      );
    }
  }, [form.getValues().image]);

  const { mutateAsync: upload } = api.campaign_user.upload.useMutation({
    onError(err) {
      toast({ title: err.message });
    },
    trpc: {
      context: {
        upload: true,
      },
    },
  });

  const handleSubmit = async () => {
    try {
      setSaving(true);

      const resCheckUser = await utils.campaign_user.check_user.fetch({
        email: getValues().email,
        campaign_id: campaignData?.id,
      });

      if (resCheckUser.role === 'agency_user') {
        toast({
          description: 'You cant apply. As your role is different.',
          variant: 'destructive',
        });
        return;
      }

      if (resCheckUser.resume_id) {
        toast({
          description: 'You have already applied .',
          variant: 'destructive',
        });
        return;
      }

      const fileExt = getValues().image.name.split('.').pop() as string;
      const formData = new FormData();
      const data: z.infer<typeof campaignFormDataSchema> = {
        ...form.getValues(),
        fileExt,
        user_id: resCheckUser?.user_id ?? null,
        applicant_id: resCheckUser?.applicant_id ?? null,
      };
      Object.entries(data)
        .filter((d) => d[1] !== null)
        .forEach(([key, value]) => {
          formData.append(key, value as string);
        });
      const res = await upload(formData);

      if (res?.interview_id) {
        const { error } = await supabase.auth.signInWithOtp({
          email: getValues().email,
          options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/interview?id=${res.interview_id}`,
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
      toast({
        description:
          error.message ?? 'An error occurred. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return { handleSubmit, saving, form };
};
