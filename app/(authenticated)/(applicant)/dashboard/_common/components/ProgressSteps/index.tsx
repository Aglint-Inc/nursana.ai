import { type resumeUploadDataSchema } from 'app/campaign/_common/api/uploadCandidateResume';
import {
  Check,
  Circle,
  CircleX,
  ExternalLink,
  Eye,
  FileText,
  RotateCw,
  TvMinimalPlay,
  Upload,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { api } from 'trpc/client';
import { type z } from 'zod';

import { useUserData, useUserDataQuery } from '@/applicant/hooks/useUserData';
import { Loader } from '@/common/components/Loader';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

// Types
type StepStatus = 'to-do' | 'success' | 'pending' | 'error';

interface Step {
  title: string;
  toDoMessage: string;
  successMessage: string;
  pendingMessage: string;
  errorMessage: string;
  status: StepStatus;
  action?: JSX.Element;
}

interface StepProps {
  title: string;
  icon: React.ReactNode;
  actionButton?: React.ReactNode;
  colorScheme: 'gray' | 'green' | 'orange' | 'yellow';
}

const BASE_BUTTON_CLASSES =
  'inline-flex cursor-pointer items-center gap-1 rounded-md bg-white px-4 py-2 text-sm font-medium text-purple-700 shadow-sm hover:bg-gray-50';

// Component for individual step
const StepItem = ({ title, icon, actionButton, colorScheme }: StepProps) => {
  return (
    <div
      className={cn(
        'flex w-full items-center justify-between rounded-lg border p-4 text-center',
        `border-${colorScheme}-500 text-${colorScheme}-500`,
      )}
    >
      <div className='flex w-full items-center gap-4'>
        <div className='text-2xl'>{icon}</div>
        <div className='flex w-full flex-row items-center justify-between gap-2'>
          <p className='font-bold'>{title}</p>
          {actionButton}
        </div>
      </div>
    </div>
  );
};

// Main component
const ProgressSteps = () => {
  const { refetch, isFetching: isUserDetailsFetching } = useUserDataQuery();
  const { resume, analysis, interview, applicant_user } = useUserData();
  const { mutateAsync: upload, isPending: resumeUploadingPending } =
    api.uploadResume.useMutation({
      onSuccess: () => {
        refetch();
        setResumeFile(undefined);
      },
      trpc: {
        context: {
          upload: true,
        },
      },
    });
  const interviewAnalysis = analysis?.structured_analysis;
  const resumeDetails = resume?.structured_resume;
  const resumeFeedback = resume?.resume_feedback;
  const resumeScore = resumeFeedback;

  const [resumeFile, setResumeFile] = useState<File | undefined>();

  const getStepIcon = (status: StepStatus): React.ReactNode => {
    const icons = {
      success: <Check />,
      pending: <Loader />,
      error: <CircleX />,
      'to-do': <Circle />,
    };
    return icons[status];
  };

  const getStepColor = (status: StepStatus): StepProps['colorScheme'] => {
    const colors = {
      'to-do': 'gray',
      pending: 'orange',
      success: 'green',
      error: 'yellow',
    };
    return colors[status] as StepProps['colorScheme'];
  };
  const steps: Step[] = [
    {
      title: 'Resume uploaded',
      toDoMessage: 'Upload resume',
      successMessage: 'Resume uploaded successfully',
      errorMessage: 'Resume processing failed',
      pendingMessage: 'Resume processing in progress',
      status:
        resume?.file_url && resumeDetails
          ? 'success'
          : resumeUploadingPending
            ? 'pending'
            : 'error',
      action:
        resume?.file_url && resumeDetails ? (
          <Link
            className={BASE_BUTTON_CLASSES}
            target={resume?.file_url ? '_blank' : undefined}
            href={resume?.file_url}
          >
            <ExternalLink className='h-4 w-4' />
          </Link>
        ) : (
          <>
            {!resumeFile && !resume?.file_url && (
              <label htmlFor='resume-file' className='cursor-pointer'>
                <input
                  id='resume-file'
                  type='file'
                  accept='.pdf,.doc,.docx,.txt'
                  onChange={handleResumeChange}
                  className='hidden'
                />
                <div className={BASE_BUTTON_CLASSES}>
                  <Upload className='h-4 w-4' />
                  Upload
                </div>
              </label>
            )}
            {!resumeUploadingPending && resumeFile && (
              <div className='flex cursor-pointer flex-col items-end'>
                <div className='flex flex-row items-center gap-1'>
                  <FileText className='h-4 w-4' />
                  <p className='one-line-clamp-1'> {resumeFile.name}</p>
                </div>
                <div className='flex flex-row gap-2'>
                  <Button
                    className={BASE_BUTTON_CLASSES}
                    onClick={() => setResumeFile(undefined)}
                  >
                    <X className='h-4 w-4 text-red-500' />
                  </Button>
                  <Button
                    className={BASE_BUTTON_CLASSES}
                    onClick={uploadResume}
                  >
                    <Check className='h-4 w-4 text-green-500' />
                  </Button>
                </div>
              </div>
            )}
            {resume?.file_url && !resumeDetails && (
              <Button
                className={BASE_BUTTON_CLASSES}
                onClick={retryResumeUpload}
              >
                <RotateCw className='h-4 w-4' />
                Retry again
              </Button>
            )}
          </>
        ),
    },
    {
      title: 'Resume analyzed',
      toDoMessage: 'Start resume analysis',
      pendingMessage: 'Resume analysis in progress',
      successMessage: 'Resume analyzed successfully',
      errorMessage: 'Resume analysis failed',
      status:
        !resume?.file_url || !resumeDetails
          ? 'to-do'
          : isUserDetailsFetching
            ? 'pending'
            : resumeScore
              ? 'success'
              : 'error',
      action:
        !resume?.file_url || !resumeDetails ? (
          <></>
        ) : resumeScore ? (
          <Link className={BASE_BUTTON_CLASSES} href='/resume-review'>
            <Eye className='h-4 w-4' />
            View
          </Link>
        ) : (
          <Button className={BASE_BUTTON_CLASSES} onClick={retryResumeAnalysis}>
            {isUserDetailsFetching ? (
              <Loader className='h-4 w-4' />
            ) : (
              <RotateCw className='h-4 w-4' />
            )}
            Retry again
          </Button>
        ),
    },
    {
      title: 'Interview Process',
      toDoMessage: 'Start interview',
      pendingMessage: 'Your interview is in pending, please start it',
      successMessage: 'You have completed the interview',
      errorMessage: '',
      status:
        interview?.interview_stage === 'interview_completed'
          ? 'success'
          : interview?.interview_stage !== 'interview_inprogress'
            ? 'pending'
            : 'to-do',
      action:
        interview?.interview_stage !== 'interview_completed' ? (
          <Link
            className={BASE_BUTTON_CLASSES}
            href={`/interview/${interview?.id}/start-interview`}
          >
            <TvMinimalPlay className='h-4 w-4' />
            Start interview
          </Link>
        ) : (
          <></>
        ),
    },
    {
      title: 'Interview Feedback',
      toDoMessage: 'Interview feedback',
      pendingMessage: 'Interview feedback is in progress',
      successMessage: 'Interview feedback submitted successfully',
      errorMessage: 'Interview feedback submission failed',
      status: interviewAnalysis ? 'success' : 'to-do',
    },
  ];

  function retryResumeAnalysis() {
    refetch();
  }

  function retryResumeUpload() {
    refetch();
  }

  async function uploadResume() {
    if (resumeFile === undefined) return;
    const fileExt = resumeFile.name.split('.').pop() as string;
    const formData = new FormData();

    const data: z.infer<typeof resumeUploadDataSchema> = {
      image: resumeFile,
      fileExt,
      campaign_id: resume?.campaign_id ?? '',
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
  function handleResumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setResumeFile(file);
    }
  }
  return (
    <div className='flex w-full flex-col gap-4'>
      {steps.map((step, index) => (
        <StepItem
          key={index}
          title={
            step.status === 'to-do'
              ? step.toDoMessage
              : step.status === 'success'
                ? step.successMessage
                : step.status === 'error'
                  ? step.errorMessage
                  : step.pendingMessage
          }
          icon={getStepIcon(step.status)}
          actionButton={step.action}
          colorScheme={getStepColor(step.status)}
        />
      ))}
    </div>
  );
};

export default ProgressSteps;
