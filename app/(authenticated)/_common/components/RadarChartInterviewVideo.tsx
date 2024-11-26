'use client';

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
} from 'recharts';

import { Card, CardContent } from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { type DBTable } from '@/server/db/types';

const chartConfig = {
  score: {
    label: 'Score',
  },
} satisfies ChartConfig;

export function RadarChartInterviewVideo({
  analysis,
}: {
  analysis: DBTable<'interview_analysis'>['video_analysis'];
}) {
  if (!analysis) return null;
  const chartData = [
    { type: 'Empathy', score: analysis.empathy_score.value },
    {
      type: 'Clarity',
      score: analysis.clarity_score.value,
    },
    { type: 'Confidence', score: analysis.confidence.value },
    { type: 'Professionalism', score: analysis.professionalism.value },
    {
      type: 'Sentiment',
      score: analysis.sentiment.confidence,
    },
    {
      type: 'Stress level',
      score: analysis.stress_level.confidence,
    },
  ];

  return (
    <Card>
      <CardContent className='pb-0'>
        <ChartContainer config={chartConfig} className='mx-auto'>
          <RadarChart data={chartData} outerRadius={200}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey='type' />
            <PolarGrid />
            <Radar
              dataKey='score'
              fill='hsl(var(--chart-4))'
              fillOpacity={0.7}
            />
            {/* Ensure the scale of scores is fixed from 0 to 5 */}
            <PolarGrid />
            <PolarAngleAxis dataKey='type' />
            <PolarRadiusAxis domain={[0, 10]} tickCount={6} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
