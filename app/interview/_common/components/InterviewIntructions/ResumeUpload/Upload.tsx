import ResumeUpload from 'app/campaign/_common/components/ResumeUpload';
import { ArrowRight } from 'lucide-react';
import { usePostHog } from 'posthog-js/react';
import { useState } from 'react';
import { type z } from 'zod';

import { useUserDataQuery } from '@/applicant/hooks/useUserData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { api } from '@/trpc/client';

import { type schemaInterviewResumeUpload } from '../../../schema/upload';
import { PurpleButtonClassName } from '../InterviewProcess/instructions';

export default function Upload() {
  const posthog = usePostHog();
  const [file, setFile] = useState<File | null>(null);

  const { data } = useUserDataQuery();
  const { mutateAsync: upload, isPending } =
    api.interview.uploadResume.useMutation({
      onError(err) {
        toast({ title: err.message });
      },
      trpc: {
        context: {
          upload: true,
        },
      },
    });

  const onNext = async () => {
    posthog.capture('interview-resume-upload-clicked');
    const fileExt = file?.name.split('.').pop() as string;
    const formData = new FormData();
    const dataTransform: z.infer<typeof schemaInterviewResumeUpload> = {
      fileExt,
      applicant_id: data.applicant_user.id,
      campaign_id: data.interview.campaign_id,
      image: file as File,
      interview_id: data.interview.id,
    };
    Object.entries(dataTransform)
      .filter((d) => d[1] !== null)
      .forEach(([key, value]) => {
        formData.append(key, value as string);
      });
    await upload(formData);
    posthog.capture('interview-resume-uploaded', {
      fileExt,
      applicant_id: data.applicant_user.id,
      campaign_id: data.interview.campaign_id,
    });
  };

  return (
    <div className='mx-auto max-w-md space-y-6'>
      <Card className='border-none bg-white/80 shadow-none backdrop-blur-md'>
        <CardHeader>
          <CardTitle className='bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-center text-2xl font-bold text-transparent'>
            Upload Your Resume
          </CardTitle>
        </CardHeader>
        <CardContent className='space-y-6'>
          <ResumeUpload
            value={file}
            onChange={(e) => {
              setFile(e);
            }}
            saving={isPending}
          />

          <div className='space-y-4'>
            <Button
              onClick={onNext}
              disabled={!file || isPending}
              className={PurpleButtonClassName}
            >
              Continue to Interview
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>

            <Button
              variant='link'
              onClick={() => {
                posthog.capture('interview-dont-have-resume');
                window.open('https://rxresu.me/', '_blank');
              }}
              className='w-full text-gray-600 hover:text-gray-900'
            >
              {`I don't have a resume yet`}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
