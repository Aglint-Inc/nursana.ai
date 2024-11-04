import { type resumeUploadDataSchema } from 'app/campaign/_common/api/uploadCandidateResume';
import axios from 'axios';
import { FileCheck, TriangleAlert, Upload } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { api } from 'trpc/client';
import { type z } from 'zod';

import { Loader } from '@/app/components/Loader';
import UIDialog from '@/app/components/UIDialog';
import { useUserData, useUserDataQuery } from '@/applicant/hooks/useUserData';
import { Button } from '@/components/ui/button';
import { type DBTable } from '@/db/types';

import RadialProgress from './RadialProgress';

type status =
  | 'reupload'
  | 'inProgress'
  | 'completed'
  | 're-analysis'
  | 're-fetch';
type ResumeCardProps = {
  resumeDetails: DBTable<'resume'> | null;
};

function ResumeCard({ resumeDetails }: ResumeCardProps) {
  const resumeStructured = resumeDetails?.structured_resume;
  const resumeFeedback = resumeDetails?.resume_feedback;
  const resumeScore = resumeFeedback?.overall_score || 0;
  const { refetch, isFetching: isUserDetailsFetching } = useUserDataQuery();

  const { resume, applicant_user } = useUserData();
  const { mutateAsync: upload, isPending: resumeUploadingPending } =
    api.uploadResume.useMutation({
      onSuccess: () => {
        refetch();
        setOpenUploadDialog(false);
        setResumeFile(undefined);
      },
      trpc: {
        context: {
          upload: true,
        },
      },
    });
  const {
    mutateAsync: fetchResumeStructure,
    isPending: resumeFetchingPending,
  } = api.interviewAnalysis.fetchResumeStructure.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const [resumeFile, setResumeFile] = useState<File | undefined>();
  const [openUploadDialog, setOpenUploadDialog] = useState(false);
  const [resumeAnalyzing, setResumeAnalyzing] = useState(false);
  function handleResumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  }
  async function uploadResume() {
    if (resumeFile === undefined) return;
    const fileExt = resumeFile.name.split('.').pop() as string;
    const formData = new FormData();

    const data: z.infer<typeof resumeUploadDataSchema> = {
      image: resumeFile,
      fileExt,
      campaign_id: resumeDetails?.campaign_id ?? '',
      user_id: applicant_user?.user.id,
      applicant_id: applicant_user?.id,
    };
    Object.entries(data)
      .filter((d) => d[1] !== null)
      .forEach(([key, value]) => {
        formData.append(key, value as string);
      });
    const res = await upload(formData);
    if (res) {
      return res;
    }
  }

  async function resumeRefetch() {
    if (resume) {
      await fetchResumeStructure({
        env:
          process.env.NEXT_PUBLIC_SITE_URL === 'https://nursana.ai'
            ? 'prod'
            : 'dev',
        resume: resume?.file_url,
        resume_id: resume?.id,
      });
    }
  }

  async function resumeAnalysisRefetch() {
    if (resume) {
      setResumeAnalyzing(true);
      await axios.post('/api/dynamic_resume_score', {
        resume_id: resume?.id,
        resume_json: resume?.structured_resume,
      });
      setResumeAnalyzing(false);
      refetch();
    }
  }
  const status: status =
    (!resumeStructured || !resumeDetails?.file_url || !resumeFeedback) &&
    (resumeUploadingPending ||
      isUserDetailsFetching ||
      resumeAnalyzing ||
      resumeFetchingPending)
      ? 'inProgress'
      : !resumeDetails?.file_url
        ? 'reupload'
        : !resumeStructured
          ? 're-fetch'
          : !resumeFeedback
            ? 're-analysis'
            : 'completed';

  if (!resumeDetails) {
    return null;
  }
  return (
    <>
      {status === 'reupload' && (
        <>
          <UIDialog
            title='Upload Resume'
            open={openUploadDialog}
            onClose={() => {
              setOpenUploadDialog(false);
            }}
            slotButtons={
              <>
                <Button
                  variant='outline'
                  onClick={() => {
                    setOpenUploadDialog(false);
                    setResumeFile(undefined);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    uploadResume();
                  }}
                >
                  {(resumeUploadingPending || isUserDetailsFetching) && (
                    <Loader />
                  )}
                  Upload
                </Button>
              </>
            }
          >
            <div>
              {resumeFile && (
                <div className='flex items-center justify-center'>
                  <FileCheck className='h-12 w-12' />
                  <p className='text-center text-sm'>{resumeFile.name}</p>
                </div>
              )}
              {!resumeFile && !resumeDetails?.file_url && (
                // eslint-disable-next-line jsx-a11y/label-has-associated-control
                <label htmlFor='resume-file' className='cursor-pointer'>
                  <input
                    id='resume-file'
                    type='file'
                    accept='.pdf,.doc,.docx,.txt'
                    onChange={handleResumeChange}
                    className='hidden'
                  />
                  <div
                    className='rounded-lg border-2 border-dashed border-border p-4'
                    onDragOver={(e) => {
                      e.preventDefault();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        setResumeFile(e.dataTransfer.files[0]);
                      }
                    }}
                  >
                    <div className='flex items-center justify-center'>
                      <Upload className='h-12 w-12' />
                    </div>
                    <p className='text-center text-sm'>
                      Drag and drop a file here or click to upload a resume
                    </p>
                  </div>
                </label>
              )}
            </div>
          </UIDialog>
          <div className='w-full rounded-lg border border-border p-6'>
            <div className='grid grid-cols-1'>
              <div className='flex h-full min-h-[230px] flex-col justify-between gap-4'>
                <div className='flex flex-col gap-2'>
                  <div className='flex h-14 w-14 items-center justify-center rounded-lg bg-red-50'>
                    <TriangleAlert
                      className='h-8 w-8 text-red-600'
                      strokeWidth={1.4}
                    />
                  </div>
                  <p className='text-lg font-medium'>Reupload your resume</p>
                  <p className='text-muted-foreground'>
                    Unable to process the uploaded resume. Please try
                    reuploading it again.
                  </p>
                </div>
                <Button onClick={() => setOpenUploadDialog(true)}>
                  Upload resume
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
      {status === 're-fetch' && (
        <div className='w-full rounded-lg border border-border p-6'>
          <div className='grid grid-cols-1'>
            <div className='flex h-full min-h-[230px] flex-col justify-between gap-4'>
              <div className='flex flex-col gap-2'>
                <div className='flex h-14 w-14 items-center justify-center rounded-lg bg-red-50'>
                  <TriangleAlert
                    className='h-8 w-8 text-red-600'
                    strokeWidth={1.4}
                  />
                </div>
                <p className='text-lg font-medium'>
                  Unable to process your resume
                </p>
                <p className='text-muted-foreground'>
                  Unable to process the uploaded resume. Please try again
                </p>
              </div>
              <Button disabled={resumeFetchingPending} onClick={resumeRefetch}>
                {resumeFetchingPending && <Loader />}
                Try again
              </Button>
            </div>
          </div>
        </div>
      )}
      {status === 're-analysis' && (
        <div className='w-full rounded-lg border border-border p-6'>
          <div className='grid grid-cols-1'>
            <div className='flex h-full min-h-[230px] flex-col justify-between gap-4'>
              <div className='flex flex-col gap-2'>
                <div className='flex h-14 w-14 items-center justify-center rounded-lg bg-red-50'>
                  <TriangleAlert
                    className='h-8 w-8 text-red-600'
                    strokeWidth={1.4}
                  />
                </div>
                <p className='text-lg font-medium'>Resume analysis failed</p>
                <p className='text-muted-foreground'>
                  Unable to process the uploaded resume. Please try again.
                </p>
              </div>
              <Button
                onClick={() => {
                  resumeAnalysisRefetch();
                }}
              >
                Try again
              </Button>
            </div>
          </div>
        </div>
      )}
      {status === 'inProgress' && (
        <div className='w-full rounded-lg border border-border p-6'>
          <div className='grid grid-cols-1'>
            <div className='flex h-full min-h-[230px] flex-col justify-between gap-4'>
              <div className='flex flex-col gap-2'>
                <div className='flex h-14 w-14 items-center justify-center rounded-lg bg-blue-50'>
                  <Loader size={20} className='text-blue-600' />
                </div>
                <p className='text-lg font-medium'>Resume is being processed</p>
                <p className='text-muted-foreground'>
                  We have received your resume and are currently analyzing it.
                  Please check back in a few minutes to view your resume score
                  and detailed analysis
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {status === 'completed' && (
        <CompletedResumeCard resumeScore={resumeScore} />
      )}
    </>
  );
}

export default ResumeCard;

export function CompletedResumeCard({ resumeScore }: { resumeScore: number }) {
  const resumeChartData = [
    {
      name: 'Score',
      value: resumeScore,
      fill: '#db2777',
      path: '#fbcfe8',
    },
  ];
  return (
    <div className='flex min-h-[230px] w-full flex-col justify-between gap-8 rounded-lg border border-border p-6'>
      <div className='grid grid-cols-2'>
        <div className='flex h-full flex-col justify-between'>
          <div className='flex flex-col gap-2'>
            <div className='flex h-14 w-14 items-center justify-center rounded-lg bg-green-50'>
              <FileCheck className='h-8 w-8 text-green-600' strokeWidth={1.4} />
            </div>
            <p className='text-lg font-medium'>Resume Analysis Completed</p>
          </div>
        </div>

        <div className='relative'>
          <div className='absolute left-[-10px] top-[-40px]'>
            <RadialProgress chartData={resumeChartData} size={200} />
          </div>
        </div>
      </div>
      <Link href={'/resume-review'} className='w-full'>
        <Button className='w-full'>View Detail</Button>
      </Link>
    </div>
  );
}
