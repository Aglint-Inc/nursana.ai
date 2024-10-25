import {
  Brain,
  ExternalLink,
  Lightbulb,
  MessageCircle,
  Puzzle,
  Sparkles,
  TvMinimalPlay,
  UserCheck,
  Zap,
} from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import NotAvailable from '@/dashboard/components/NotAvailable';
import ProgressBarCard from '@/dashboard/components/ProgressBarCard';
import RadialProgress from '@/dashboard/components/RadialProgress';

import { useApplicant } from '../../Context';

export const InterviewReview = () => {
  const { data } = useApplicant();

  const { analysis: ana } = data;
  const analysis = ana?.structured_analysis;

  if (!analysis) {
    return (
      <NotAvailable
        heading='Data temporarily unavailable'
        description='We’re currently analyzing the data. Please check back in a little while for updated information.'
        Icon={Sparkles}
      />
    );
  }

  const chartData = [
    {
      name: 'Score',
      value: analysis.overall_score,
      fill: '#8b5cf6',
      path: '#ddd6fe',
    },
  ];

  return (
    <div className='p-0'>
      <div className='mb-6 text-xl font-medium'>Interview Feedback</div>
      <div className='mb-16 flex flex-col gap-2'>
        <ProgressBarCard
          summary={analysis.overall_summary || 'No summary available.'}
          color='purple'
        >
          <RadialProgress chartData={chartData} size={200} />
        </ProgressBarCard>
        <div>
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
        </div>
      </div>

      <div className='flex flex-col gap-10'>
        <div className='flex flex-col gap-8'>
          {analysis.articulation && (
            <RatingBar
              label='Articulation'
              score={analysis.articulation.score}
              explanation={analysis.articulation.explanation}
              icon={<Brain className='h-5 w-5 text-purple-600' />}
            />
          )}

          {analysis.confidence_level && (
            <RatingBar
              label='Confidence Level'
              score={analysis.confidence_level.score}
              explanation={analysis.confidence_level.explanation}
              icon={<Zap className='h-5 w-5 text-purple-600' />}
            />
          )}

          {analysis.agent_interaction && (
            <RatingBar
              label='Agent Interaction'
              score={analysis.agent_interaction.score}
              explanation={analysis.agent_interaction.explanation}
              icon={<MessageCircle className='h-5 w-5 text-purple-600' />}
            />
          )}

          {analysis.communication_gaps && (
            <RatingBar
              label='Communication Gaps'
              score={analysis.communication_gaps.score}
              explanation={analysis.communication_gaps.explanation}
              icon={<Puzzle className='h-5 w-5 text-purple-600' />}
            />
          )}

          {analysis.engagement_responsiveness && (
            <RatingBar
              label='Engagement & Responsiveness'
              score={analysis.engagement_responsiveness.score}
              explanation={analysis.engagement_responsiveness.explanation}
              icon={<UserCheck className='h-5 w-5 text-purple-600' />}
            />
          )}

          {analysis.adaptability_stress_management && (
            <RatingBar
              label='Adaptability & Stress Management'
              score={analysis.adaptability_stress_management.score}
              explanation={analysis.adaptability_stress_management.explanation}
              icon={<Lightbulb className='h-5 w-5 text-purple-600' />}
            />
          )}
        </div>
      </div>
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
      <div className='flex justify-between'>
        <div className='flex items-start space-x-2'>
          {icon}
          <span className='text-lg font-medium'>{label}</span>
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
