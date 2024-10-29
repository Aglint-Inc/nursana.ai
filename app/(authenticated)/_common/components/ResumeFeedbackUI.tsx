import { ExternalLink, FileText, Lightbulb, Notebook } from 'lucide-react';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';
import NotAvailable from '@/dashboard/components/NotAvailable';
import ProgressBarCard from '@/dashboard/components/ProgressBarCard';
import RadialProgress from '@/dashboard/components/RadialProgress';
import { type FeedbackData } from '@/dashboard/components/ResumeFeedback';
import { type Database } from '@/supabase-types/database.types';
import { useBucket } from '@/hooks/use-bucket';

const ErrorFallback = () => {
  return (
    <NotAvailable
      Icon={Notebook}
      description={` Resume Feedback is currently unavailable`}
      heading={`Data temporarily unavailable`}
    />
  );
};

export const ResumeFeedbackUI = ({
  resume,
  isCandidateView = false,
}: {
  resume: Database['public']['Tables']['resume']['Row'];
  isCandidateView?: boolean;
}) => {
  const resumeFeedback = resume?.resume_feedback as FeedbackData;
  const experience = resumeFeedback?.breakdown?.experience;
  const educationAndCertifications =
    resumeFeedback?.breakdown?.education_and_certifications;

  if (!resumeFeedback && (resume?.error_status || resume?.processing_status))
    return <ErrorFallback />;

  const summary = isCandidateView
    ? resumeFeedback?.overall_feedback || ''
    : resumeFeedback?.overall_summary || '';

  return (
    <div className='mb-6'>
      <div className='mb-6 text-xl font-medium'>Resume Review</div>

      <ResumeScoreCard resume={resume} summary={summary} />
      <div className='flex flex-col gap-10'>
        {experience && (
          <ResumeExperienceCard
            experience={experience}
            isCandidateView={isCandidateView}
          />
        )}
        {educationAndCertifications && (
          <ResumeEducationCard
            educationAndCertifications={educationAndCertifications}
            isCandidateView={isCandidateView}
          />
        )}
      </div>
    </div>
  );
};

ResumeFeedbackUI.ErrorFallback = ErrorFallback;

const ResumeExperienceCard = ({
  experience,
  isCandidateView,
}: {
  experience: FeedbackData['breakdown']['experience'];
  isCandidateView: boolean;
}) => {
  const feedback = experience?.feedback;
  const suggestions = experience?.suggestions;
  const specialties = experience?.specialties?.comments;
  const healthcare_settings = experience?.healthcare_settings?.comments;
  const leadership_roles = experience?.leadership_roles?.comments;
  const years_of_experience = experience?.years_of_experience?.comments;

  const Experience = [
    {
      label: 'Specialties',
      value: specialties,
    },
    {
      label: 'Leadership Roles',
      value: leadership_roles,
    },
    {
      label: 'Healthcare Settings',
      value: healthcare_settings,
    },
    {
      label: 'Years of Experience',
      value: years_of_experience,
    },
  ].filter(({ value }) => !!value);

  return (
    <div>
      <h3 className='mb-2 text-lg font-medium'>Experience</h3>
      {isCandidateView ? (
        suggestions && (
          <div className='mt-4 flex flex-col gap-1 rounded-lg bg-purple-50 p-4'>
            <div className='text-md flex items-center gap-2 font-medium text-purple-700'>
              <Lightbulb className='h-5 w-5' />
              <span>Suggestion</span>
            </div>
            <p className='text-md mt-2 font-normal'>{suggestions}</p>
          </div>
        )
      ) : (
        <>
          <p className='mb-2 text-muted-foreground'>{feedback}</p>
          <ul className='list-inside list-disc space-y-2'>
            {Experience.map(({ label, value }, i) => (
              <li key={i}>
                <span className='font-semibold'>{label} : </span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

const ResumeEducationCard = ({
  educationAndCertifications,
  isCandidateView,
}: {
  educationAndCertifications: FeedbackData['breakdown']['education_and_certifications'];
  isCandidateView: boolean;
}) => {
  const feedback = educationAndCertifications?.feedback;
  const suggestions = educationAndCertifications?.suggestions;
  const degree = educationAndCertifications?.degree?.comments;
  const certifications = educationAndCertifications?.certifications?.comments;
  const specializations = educationAndCertifications?.specializations?.comments;

  const Education = [
    {
      label: 'Degree',
      value: degree,
    },
    {
      label: 'Certifications',
      value: certifications,
    },
    {
      label: 'Specializations',
      value: specializations,
    },
  ].filter(({ value }) => !!value);

  return (
    <div>
      <h3 className='mb-2 text-lg font-medium'>Education and Certifications</h3>
      {isCandidateView ? (
        suggestions && (
          <div className='mt-4 flex flex-col gap-1 rounded-lg bg-purple-50 p-4'>
            <div className='text-md flex items-center gap-2 font-medium text-purple-700'>
              <Lightbulb className='h-5 w-5' />
              <span>Suggestion</span>
            </div>
            <p className='text-md mt-2 font-normal'>{suggestions}</p>
          </div>
        )
      ) : (
        <>
          <p className='mb-2 text-muted-foreground'>{feedback}</p>
          <ul className='list-inside list-disc space-y-2'>
            {Education.map(({ label, value }, i) => (
              <li key={i}>
                <span className='font-semibold'>{label} : </span>
                <span>{value}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

const ResumeScoreCard = ({
  resume,
  summary,
}: {
  resume: Database['public']['Tables']['resume']['Row'];
  summary: string;
}) => {
  const file_url = resume?.file_url || '';

  const resumeBucketName = 'resumes';
  const fileName = file_url?.split(`${resumeBucketName}/`).pop() ?? '';
  const { data: resumeUrl } = useBucket(resumeBucketName, fileName);

  const resumeScore = resume?.resume_feedback?.overallScore ?? 0;
  const errorStatus = resume?.error_status;
  const ResumeScores = [
    {
      name: 'Score',
      value: resumeScore,
      fill: '#db2777',
      path: '#fbcfe8',
    },
  ];

  return (
    <div className='mb-10 flex flex-col gap-2'>
      <ProgressBarCard
        summary={summary ?? 'Summary not available'}
        color='pink'
      >
        <RadialProgress chartData={ResumeScores} size={200} />
      </ProgressBarCard>
      {!errorStatus && resumeUrl && (
        <Link href={resumeUrl} rel='noopener noreferrer' target='_blank'>
          <Card className='group border-border shadow-none duration-300 hover:bg-muted'>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <FileText
                    className='mr-2 h-6 w-6 text-muted-foreground'
                    strokeWidth={1}
                  />
                  <div className='flex items-center'>View my resume</div>
                </div>
                <div className='group relative'>
                  <ExternalLink className='mr-4 h-4 w-4' />
                </div>
              </div>
            </CardContent>
          </Card>
        </Link>
      )}
    </div>
  );
};
