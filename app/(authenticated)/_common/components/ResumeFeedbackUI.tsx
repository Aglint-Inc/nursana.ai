import {
  Brain,
  Briefcase,
  ExternalLink,
  FileText,
  GraduationCap,
  Languages,
  Notebook,
  Star,
} from 'lucide-react';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import NotAvailable from '@/dashboard/components/NotAvailable';
import ProgressBarCard from '@/dashboard/components/ProgressBarCard';
import RadialProgress from '@/dashboard/components/RadialProgress';
import type { DBTable } from '@/db/types';

import { RadarChartResume } from './RadarChartResume';

const ErrorFallback = () => {
  return (
    <NotAvailable
      Icon={Notebook}
      description={`Resume Feedback is currently unavailable`}
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
  if (
    !resume?.resume_feedback &&
    (resume?.error_status || resume?.processing_status)
  ) {
    return <ErrorFallback />;
  }
  const resumeFeedback = resume?.resume_feedback!;
  const achievements_and_metrics = resumeFeedback.achievements_and_metrics;
  const education = resumeFeedback.education;
  const experience_relevance_and_clarity =
    resumeFeedback.experience_relevance_and_clarity;
  const grammar_and_language = resumeFeedback.grammar_and_language;
  const professional_summary = resumeFeedback.professional_summary;
  const skills_and_keywords = resumeFeedback.skills_and_keywords;

  const details = [
    {
      label: 'Achievements And Metrics',
      icon: <Star className='h-5 w-5 text-purple-600' />,
      ...achievements_and_metrics,
    },
    {
      label: 'Education',
      icon: <GraduationCap className='h-5 w-5 text-purple-600' />,
      ...education,
    },
    {
      label: 'Experience Relevance And Clarity',
      icon: <Briefcase className='h-5 w-5 text-purple-600' />,
      ...experience_relevance_and_clarity,
    },
    {
      label: 'Grammar And Language',
      icon: <Languages className='h-5 w-5 text-purple-600' />,
      ...grammar_and_language,
    },
    {
      label: 'Professional Summary',
      icon: <FileText className='h-5 w-5 text-purple-600' />,
      ...professional_summary,
    },
    {
      label: 'Skills And Keywords',
      icon: <Brain className='h-5 w-5 text-purple-600' />,
      ...skills_and_keywords,
    },
  ];
  const summary = isCandidateView
    ? resumeFeedback?.overall_feedback || 'No summary available'
    : resumeFeedback?.overall_comment || 'No summary available';

  return (
    <div className='my-3 flex flex-col gap-8 lg:container max-lg:py-5 lg:my-6'>
      <div className='text-md mb-6 font-medium lg:text-xl'>Resume Review</div>

      <ResumeScoreCard
        resume={resume}
        summary={summary}
        resumeUrl={resumeUrl}
      />
      <RadarChartResume feedback={resume.resume_feedback} />
      <div className='mb-20 flex flex-col gap-10'>
        {details.map((detail) => (
          <RatingBar
            key={detail.label}
            label={detail.label}
            score={detail.score}
            explanation={isCandidateView ? detail.feedback : detail.comment}
            icon={detail.icon}
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
          <span className='text-md font-medium lg:text-lg'>{label}</span>
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
    <div className='flex flex-col gap-2'>
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
