import { useRouter } from 'next/navigation';
import { useState } from 'react';
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

  const form = useZodFormData({
    schema: campaignFormDataSchema,
    defaultValues: {
      email: '',
      role: 'nurse-practitioner',
      first_name: '',
      last_name: '',
    },
  });

  const { getValues, setError } = form;

  const campaign_id = campaignData?.id;

  const { mutateAsync: upload } = api.campaign_user.upload.useMutation({
    onError(err) {
      alert('Error from server: ' + err.message);
    },
    trpc: {
      context: {
        upload: true,
      },
    },
  });

  const utils = api.useUtils();

  const handleSubmit = async () => {
    try {
      setSaving(true);
      
      const resCheckUser = await utils.campaign_user.check_user.fetch({
        email: getValues().email,
        campaign_id: campaignData?.id,
      });

      if (resCheckUser.resume?.id) {
        setError('email', {
          message: 'User already exists',
        });
        return;
      }
      const fileExt = getValues().image.name.split('.').pop() as string;
      const formData = new FormData();
      const data: z.infer<typeof campaignFormDataSchema> = {
        ...form.getValues(),
        campaign_id,
        fileExt,
      };
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      const res = await upload(formData);

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
