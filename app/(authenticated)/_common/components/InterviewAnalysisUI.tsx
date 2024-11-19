import {
  Brain,
  Lightbulb,
  Puzzle,
  TvMinimalPlay,
  UserCheck,
  Zap,
} from 'lucide-react';

import { Progress } from '@/components/ui/progress';
import NotAvailable from '@/dashboard/components/NotAvailable';
import ProgressBarCard from '@/dashboard/components/ProgressBarCard';
import RadialProgress from '@/dashboard/components/RadialProgress';
import type { DBTable } from '@/server/db/types';

import { RadarChartInterview } from './RadarChartInterview';

const ErrorFallback = () => {
  return (
    <NotAvailable
      heading='Interview hasn’t been completed yet.'
      description=''
      Icon={TvMinimalPlay}
      actionBtn={<></>}
    />
  );
};

export const InterviewAnalysisUI = ({
  analysis,
  isCandidateView = false,
}: {
  analysis: DBTable<'interview_analysis'>['structured_analysis'];
  isCandidateView?: boolean;
}) => {
  if (!analysis) return <ErrorFallback />;

  const articulation = analysis.articulation;
  const confidence_level = analysis.confidence_level;
  const communication_gaps = analysis.communication_gaps;
  const engagement_responsiveness = analysis.engagement_responsiveness;
  const adaptability_stress_management =
    analysis.adaptability_stress_management;

  const summary = isCandidateView
    ? analysis.overall_feedback
    : analysis.overall_summary;

  return (
    <div className='mx-auto max-w-4xl p-0 lg:container max-lg:py-5 lg:py-10'>
      <div className='text-md mb-3 font-medium lg:mb-6 lg:text-xl'>
        Interview Feedback
      </div>
      <div className='mb-20 flex flex-col gap-8'>
        <AnalysisInterview
          overallScore={analysis?.overall_score ?? 0}
          summary={summary || 'No summary available.'}
        />
        <RadarChartInterview analysis={analysis} />
        <div className='flex flex-col gap-8'>
          {articulation && (
            <RatingBar
              label='Articulation'
              score={articulation.score}
              explanation={
                isCandidateView
                  ? articulation.feedback
                  : articulation.explanation
              }
              icon={<Brain className='h-5 w-5 text-purple-600' />}
            />
          )}

          {confidence_level && (
            <RatingBar
              label='Confidence Level'
              score={confidence_level.score}
              explanation={
                isCandidateView
                  ? confidence_level.feedback
                  : confidence_level.explanation
              }
              icon={<Zap className='h-5 w-5 text-purple-600' />}
            />
          )}

          {communication_gaps && (
            <RatingBar
              label='Communication Gaps'
              score={communication_gaps.score}
              explanation={
                isCandidateView
                  ? communication_gaps.feedback
                  : communication_gaps.explanation
              }
              icon={<Puzzle className='h-5 w-5 text-purple-600' />}
            />
          )}

          {engagement_responsiveness && (
            <RatingBar
              label='Engagement & Responsiveness'
              score={engagement_responsiveness.score}
              explanation={
                isCandidateView
                  ? engagement_responsiveness.feedback
                  : engagement_responsiveness.explanation
              }
              icon={<UserCheck className='h-5 w-5 text-purple-600' />}
            />
          )}

          {adaptability_stress_management && (
            <RatingBar
              label='Adaptability & Stress Management'
              score={adaptability_stress_management.score}
              explanation={
                isCandidateView
                  ? adaptability_stress_management.feedback
                  : adaptability_stress_management.explanation
              }
              icon={<Lightbulb className='h-5 w-5 text-purple-600' />}
            />
          )}
        </div>
      </div>
    </div>
  );
};

InterviewAnalysisUI.ErrorFallback = ErrorFallback;
const AnalysisInterview = ({
  overallScore,
  summary,
}: {
  summary: string;
  overallScore: number;
}) => {
  const chartData = [
    {
      name: 'Score',
      value: overallScore,
      fill: '#8b5cf6',
      path: '#ddd6fe',
    },
  ];

  return (
    <div className='flex flex-col gap-2'>
      <ProgressBarCard summary={summary} color='purple'>
        <RadialProgress chartData={chartData} size={200} />
      </ProgressBarCard>
    </div>
  );
};

const RatingBar: React.FC<{
  label: string;
  score: number;
  explanation: string;
  icon: React.ReactNode;
}> = ({ label, score, explanation, icon }) => (
  <>
    <div className='flex flex-col gap-1'>
      <div className='flex max-md:flex-col max-md:gap-2 md:justify-between'>
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
