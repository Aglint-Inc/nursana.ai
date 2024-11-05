import {
  Brain,
  ExternalLink,
  Lightbulb,
  Puzzle,
  Sparkles,
  TvMinimalPlay,
  UserCheck,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import NotAvailable from '@/dashboard/components/NotAvailable';
import ProgressBarCard from '@/dashboard/components/ProgressBarCard';
import RadialProgress from '@/dashboard/components/RadialProgress';
import type { InterviewAnalysisType } from '@/dashboard/types';

const ErrorFallback = () => {
  return (
    <NotAvailable
      heading='Data temporarily unavailable'
      description='We’re currently analyzing the data. Please check back in a little while for updated information.'
      Icon={Sparkles}
    />
  );
};

export const InterviewAnalysisUI = ({
  analysis,
  isCandidateView = false,
}: {
  analysis: InterviewAnalysisType;
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
    <div className='mx-auto max-w-4xl p-0 lg:py-10 max-lg:py-5'>
      <div className='mb-3 lg:mb-6 lg:text-xl text-md font-medium'>Interview Feedback</div>
      <div className='flex flex-col mb-20'>
        <AnalysisInterview
          overallScore={analysis?.overall_score ?? 0}
          summary={summary || 'No summary available.'}
        />
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
    <div className='lg:mb-16 mb-10 flex flex-col gap-2'>
      <ProgressBarCard summary={summary} color='purple'>
        <RadialProgress chartData={chartData} size={200} />
      </ProgressBarCard>
      <Link href={'/interview-transcript'}>
        <Card className='group border-border shadow-none duration-300 hover:bg-muted'>
          <CardContent className='p-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <TvMinimalPlay
                  className='mr-2 h-6 w-6 text-muted-foreground'
                  strokeWidth={1}
                />
                <div className='flex items-center'>Replay interview</div>
              </div>
              <div className='group relative'>
                <ExternalLink className='mr-4 h-4 w-4' />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
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
      <div className='flex md:justify-between max-md:flex-col max-md:gap-2'>
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
