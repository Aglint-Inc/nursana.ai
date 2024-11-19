'use client';

import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts';

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

export function RadarChartInterview({
  analysis,
}: {
  analysis: DBTable<'interview_analysis'>['structured_analysis'];
}) {
  const chartData = [
    { type: 'Articulation', score: analysis?.articulation.score },
    {
      type: 'Adaptability stress management',
      score: analysis?.adaptability_stress_management.score,
    },
    { type: 'Communication gaps', score: analysis?.communication_gaps.score },
    { type: 'Confidence level', score: analysis?.confidence_level.score },
    {
      type: 'Engagement Responsiveness',
      score: analysis?.engagement_responsiveness.score,
    },
  ];

  return (
    <Card>
      <CardContent className='pb-0'>
        <ChartContainer config={chartConfig} className='mx-auto'>
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey='type' />
            <PolarGrid />
            <Radar
              dataKey='score'
              fill='hsl(var(--chart-3))'
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
