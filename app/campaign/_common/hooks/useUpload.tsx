import { useRouter, useSearchParams } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
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
  const posthog = usePostHog();
  const { data: campaignData } = useCampaign();
  const [saving, setSaving] = useState(false);
  const [isAppoloCampaignLoading, setIsAppoloCampaignLoading] = useState(true);
  const router = useRouter();
  const utils = api.useUtils();

  const searchParams = useSearchParams();

  const isAppoloCampaign = Boolean(
    searchParams.get('email') && searchParams.get('name'),
  );

  useEffect(() => {
    if (isAppoloCampaign) {
      handleSubmitWithoutResume();
    } else {
      setIsAppoloCampaignLoading(false);
    }
  }, []);

  const form = useZodFormData({
    schema: campaignFormDataSchema,
    defaultValues: {
      email: '',
      role: 'registered-nurse',
      first_name: '',
      last_name: '',
      campaign_id: campaignData?.id,
      user_id: null,
      terms_accepted: 'true',
      licenses: JSON.stringify([]),
    },
  });

  const { getValues } = form;

  useEffect(() => {
    if (form.getValues().image && getValues().image?.name.split('.').pop()) {
      form.setValue(
        'fileExt',
        getValues().image?.name.split('.').pop() as string,
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

  const { mutateAsync: uploadWithoutResume } =
    api.campaign_user.upload_without_resume.useMutation({
      onError(err) {
        toast({ title: err.message });
      },
    });

  const handleSubmit = async () => {
    try {
      setSaving(true);

      const resCheckUser = await checkUser({
        email: getValues().email,
      });

      if (!resCheckUser) return;

      posthog.capture('campaign-submitted', {
        email: getValues().email,
        first_name: getValues().first_name,
        role: getValues().role,
        licenses: getValues().licenses,
        campaign_id: campaignData?.id,
        applicant_id: resCheckUser?.applicant_id,
      });

      const fileExt = getValues().image?.name.split('.').pop() as string;
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

  const handleSubmitWithoutResume = async () => {
    const email = searchParams.get('email') as string;
    const name = searchParams.get('name') as string;
    const currentJobtitle = searchParams.get('jobtitle') as string;
    const currentCompany = searchParams.get('company') as string;
    const resCheckUser = await checkUser({
      email,
    });

    if (!resCheckUser) return;

    if (
      resCheckUser.interview?.interview_stage === 'not_started' ||
      resCheckUser.interview?.interview_stage === 'resume_submitted' ||
      resCheckUser.interview?.interview_stage === 'interview_inprogress'
    ) {
      await sigIn(email);
      router.push(`/interview/${resCheckUser.interview.id}/start-interview`);
    } else if (
      resCheckUser.interview?.interview_stage === 'interview_completed'
    ) {
      await sigIn(email);
      router.push(`/dashboard`);
    } else {
      posthog.capture('campaign-submitted', {
        email,
        first_name: name,
        role: getValues().role,
        licenses: 'Registered Nurse',
        campaign_id: campaignData?.id,
        applicant_id: getValues().applicant_id,
      });

      const resUpload = await uploadWithoutResume({
        email,
        first_name: name,
        campaign_id: campaignData?.id,
        licenses: JSON.stringify(['registered-nurse']),
        role: 'registered-nurse',
        user_id: resCheckUser?.user_id ?? null,
        applicant_id: resCheckUser?.applicant_id ?? null,
        current_company: currentCompany,
        current_job_title: currentJobtitle,
      });
      await sigIn(email);
      router.push(`/interview/${resUpload.interview_id}/start-interview`);
    }
  };

  const checkUser = async ({ email }: { email: string }) => {
    const resCheckUser = await utils.campaign_user.check_user.fetch({
      email,
      campaign_id: campaignData?.id,
    });

    if (resCheckUser.role === 'agency_user') {
      toast({
        description: 'You cant apply. As your role is different.',
        variant: 'destructive',
      });
      return;
    }

    //in appolo campaign we are skipping resume upload user is directly going to interview
    if (!isAppoloCampaign && resCheckUser.resume?.id) {
      toast({
        description: 'You have already applied . Please signin to view details',
        variant: 'destructive',
      });
      router.push('/auth/sign-in');
      return;
    }

    return resCheckUser;
  };

  const sigIn = async (email: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: 'Welcome@123',
    });

    if (error)
      toast({ description: 'Error signing user', variant: 'destructive' });
  };

  return {
    handleSubmit,
    saving,
    form,
    isAppoloCampaign,
    isAppoloCampaignLoading,
  };
};
