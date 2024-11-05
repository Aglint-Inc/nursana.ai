import { Brain, ExternalLink, FileText, Notebook } from 'lucide-react';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import NotAvailable from '@/dashboard/components/NotAvailable';
import ProgressBarCard from '@/dashboard/components/ProgressBarCard';
import RadialProgress from '@/dashboard/components/RadialProgress';
import { type FeedbackData } from '@/dashboard/components/ResumeFeedback';
import type { DBTable } from '@/db/types';

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
  resumeUrl,
}: {
  resume: DBTable<'resume'>;
  isCandidateView?: boolean;
  resumeUrl: string;
}) => {
  const resumeFeedback = resume?.resume_feedback as FeedbackData;
  if (!resumeFeedback && (resume?.error_status || resume?.processing_status))
    return <ErrorFallback />;

  const achievements_and_metrics = resumeFeedback.achievements_and_metrics;
  const education = resumeFeedback.education;
  const experience_relevance_and_clarity =
    resumeFeedback.experience_relevance_and_clarity;
  const grammar_and_language = resumeFeedback.grammar_and_language;
  const professional_summary = resumeFeedback.professional_summary;
  const skills_and_keywords = resumeFeedback.skills_and_keywords;

  const details = [
    { label: 'Achievements And Metrics', ...achievements_and_metrics },
    { label: 'Education', ...education },
    {
      label: 'Experience Relevance And Clarity',
      ...experience_relevance_and_clarity,
    },
    { label: 'Grammar And Language', ...grammar_and_language },
    { label: 'Professional Summary', ...professional_summary },
    { label: 'Skills And Keywords', ...skills_and_keywords },
  ];
  const summary = isCandidateView
    ? resumeFeedback?.overall_feedback || 'No summary available'
    : resumeFeedback?.overall_comment || 'No summary available';

  return (
    <div className='lg:mb-6 mb-3 max-lg:py-5'>
      <div className='mb-6 lg:text-xl text-md font-medium'>Resume Review</div>

      <ResumeScoreCard
        resume={resume}
        summary={summary}
        resumeUrl={resumeUrl}
      />
      <div className='flex flex-col gap-10'>
        {details.map((detail) => (
          <RatingBar
            key={detail.label}
            label={detail.label}
            score={detail.score}
            explanation={isCandidateView ? detail.feedback : detail.comment}
            icon={<Brain className='h-5 w-5 text-purple-600' />}
          />
        ))}
      </div>
    </div>
  );
};

ResumeFeedbackUI.ErrorFallback = ErrorFallback;

const RatingBar: React.FC<{
  label: string;
  score: number;
  explanation: string;
  icon: React.ReactNode;
}> = ({ label, score, explanation, icon }) => (
  <>
    <div className='flex flex-col gap-1'>
      <div className='flex justify-between max-lg:flex-col max-lg:gap-2'>
        <div className='flex items-start space-x-2'>
          {icon}
          <span className='lg:text-lg text-md font-medium'>{label}</span>
        </div>

        <div className='flex w-40 items-center space-x-2'>
          <Progress value={score * 20} className='h-1.5 w-full' />
          <span className='text-xs text-muted-foreground'>{score}/5</span>
        </div>
      </div>

      <p className='text-muted-foreground'>{explanation}</p>
    </div>
  </>
);

const ResumeScoreCard = ({
  resume,
  summary,
  resumeUrl,
}: {
  resume: DBTable<'resume'>;
  summary: string;
  resumeUrl: string;
}) => {
  const resumeScore = resume?.resume_feedback?.overall_score ?? 0;
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
