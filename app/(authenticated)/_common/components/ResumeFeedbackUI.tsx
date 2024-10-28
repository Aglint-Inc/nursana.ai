import { Card, CardContent } from '@/components/ui/card';
import NotAvailable from '@/dashboard/components/NotAvailable';
import ProgressBarCard from '@/dashboard/components/ProgressBarCard';
import RadialProgress from '@/dashboard/components/RadialProgress';
import { FeedbackData } from '@/dashboard/components/ResumeFeedback';
import { Database } from '@/supabase-types/database.types';
import { ExternalLink, FileText, Lightbulb, Notebook } from 'lucide-react';
import Link from 'next/link';

export const ResumeFeedbackUI = ({
  resume,
}: {
  resume: Database['public']['Tables']['resume']['Row'];
}) => {
  const resumeStatusError =
    (Object.values(resume?.processing_status)[0] as any).error ?? '';

  const resumeFeedback = resume?.resume_feedback as FeedbackData;
  const breakdown = resumeFeedback?.breakdown;
  const resumeScore = resume?.resume_feedback?.overallScore ?? 0;

  const ResumeScores = [
    {
      name: 'Score',
      value: resumeScore,
      fill: '#db2777',
      path: '#fbcfe8',
    },
  ];

  if (!resumeFeedback && (resume?.error_status || resume?.processing_status))
    return (
      <NotAvailable
        Icon={Notebook}
        description={`${resumeStatusError ? resumeStatusError + ':' : ''} Resume Feedback is currently unavailable`}
        heading={`Data temporarily unavailable`}
      />
    );

  return (
    <div className='mb-6'>
      <div className='mb-6 text-xl font-medium'>Resume Review</div>
      <div className='mb-10 flex flex-col gap-2'>
        <ProgressBarCard summary={resumeFeedback?.summary ?? ''} color='pink'>
          <RadialProgress chartData={ResumeScores} size={200} />
        </ProgressBarCard>
        {!resume?.error_status && resume?.file_url ? (
          <Link
            href={resume?.file_url}
            rel='noopener noreferrer'
            target='_blank'
          >
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
        ) : null}
      </div>

      <div className='flex flex-col gap-10'>
        {/* <div>
        <h3 className='mb-2 text-lg font-medium'>Summary</h3>
        <p className='text-muted-foreground'>{summary}</p>
      </div>

      <div>
        <h3 className='mb-2 text-lg font-medium'>Overall Score</h3>
        
        <Progress value={overallScore} max={50} className='h-2 w-full' />
        <p className='mt-1 text-sm text-muted-foreground'>
          {Math.floor(overallScore + 1.55)} / 50
        </p>
      </div> */}

        <div>
          <h3 className='mb-2 text-lg font-medium'>Experience</h3>
          <p className='mb-2 text-muted-foreground'>
            {breakdown.experience.feedback}
          </p>
          <ul className='list-inside list-disc space-y-2'>
            <li>Specialties: {breakdown.experience.specialties.comments}</li>
            <li>
              Leadership Roles: {breakdown.experience.leadership_roles.comments}
            </li>
            <li>
              Healthcare Settings:{' '}
              {breakdown.experience.healthcare_settings.comments}
            </li>
            <li>
              Years of Experience:{' '}
              {breakdown.experience.years_of_experience.comments}
            </li>
          </ul>
          <div className='mt-4 flex flex-col gap-1 rounded-lg bg-purple-50 p-4'>
            <div className='text-md flex items-center gap-2 font-medium text-purple-700'>
              <Lightbulb className='h-5 w-5' />
              <span>Suggestion</span>
            </div>
            <p className='text-md mt-2 font-normal'>
              {breakdown.experience.suggestions}
            </p>
          </div>
        </div>

        <div>
          <h3 className='mb-2 text-lg font-medium'>
            Education and Certifications
          </h3>
          <p className='mb-2 text-muted-foreground'>
            {breakdown.education_and_certifications.feedback}
          </p>
          <ul className='list-inside list-disc space-y-2'>
            <li>
              Degree: {breakdown.education_and_certifications.degree.comments}
            </li>
            <li>
              Certifications:{' '}
              {breakdown.education_and_certifications.certifications.comments}
            </li>
            <li>
              Specializations:{' '}
              {breakdown.education_and_certifications.specializations.comments}
            </li>
          </ul>

          <div className='mt-4 flex flex-col gap-1 rounded-lg bg-purple-50 p-4'>
            <div className='text-md flex items-center gap-2 font-medium text-purple-700'>
              <Lightbulb className='h-5 w-5' />
              <span>Suggestion</span>
            </div>
            <p className='text-md mt-2 font-normal'>
              {breakdown.education_and_certifications.suggestions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
