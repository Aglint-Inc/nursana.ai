import {
  Brain,
  Lightbulb,
  MessageCircle,
  Puzzle,
  UserCheck,
  Zap,
} from 'lucide-react';
import React from 'react';
import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from 'recharts';

import { useUserData } from '@/authenicated/hooks/useUserData';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const RatingBar: React.FC<{
  label: string;
  score: number;
  explanation: string;
  icon: React.ReactNode;
}> = ({ label, score, explanation, icon }) => (
  <div className='grid grid-cols-[1fr,2fr] items-end gap-4'>
    <div className='space-y-2 pb-2'>
      <div className='flex items-start space-x-2'>
        {icon}
        <span className='font-semibold'>{label}</span>
      </div>
      <div className='flex items-center space-x-2'>
        <Progress value={score * 20} className='h-2 w-full' />
        <span className='text-sm font-medium'>{score}/5</span>
      </div>
    </div>
    <p className='ml-6 text-sm text-muted-foreground'>{explanation}</p>
  </div>
);

export function InterviewAnalysis() {
  const userData = useUserData();
  const analysis = userData?.analysis?.structured_analysis;

  if (!analysis) {
    return <div>No analysis available.</div>;
  }

  const chartData = [
    {
      name: 'Score',
      value: analysis.overall_score,
      fill: '#8b5cf6',
    },
  ];

  return (
    <Card className='p-0'>
      <CardContent className='space-y-6 p-0'>
        <div className='grid grid-cols-[1fr,2fr] items-center gap-6 bg-purple-50 p-4'>
          <div className='h-48 w-48'>
            <ResponsiveContainer width='100%' height='100%'>
              <RadialBarChart
                cx='50%'
                cy='50%'
                innerRadius='60%'
                outerRadius='80%'
                barSize={10}
                data={chartData}
                startAngle={180}
                endAngle={-180}
              >
                <PolarAngleAxis
                  type='number'
                  domain={[0, 100]}
                  angleAxisId={0}
                  tick={false}
                />
                <RadialBar
                  background
                  dataKey='value'
                  angleAxisId={0}
                  data={chartData}
                  cornerRadius={5}
                />
                <text
                  x='50%'
                  y='50%'
                  textAnchor='middle'
                  dominantBaseline='middle'
                  className='fill-purple-800 text-2xl font-bold'
                >
                  {analysis.overall_score.toFixed(1)}
                </text>
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className='space-y-4'>
            <h3 className='text-xl font-semibold text-purple-800'>
              Overall Score: {analysis.overall_score?.toFixed(1) || 'N/A'}/100
            </h3>
            <p className='text-sm text-purple-700'>
              {analysis.overall_summary || 'No summary available.'}
            </p>
          </div>
        </div>

        <div className='space-y-6 p-8'>
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
      </CardContent>
    </Card>
  );
}
