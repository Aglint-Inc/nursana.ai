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

export function RadarChartResume({
  feedback,
}: {
  feedback: DBTable<'resume'>['resume_feedback'];
}) {
  const chartData = [
    {
      type: 'Professional summary',
      score: feedback?.professional_summary.score,
    },
    {
      type: 'Experience relevance ',
      score: feedback?.experience_relevance_and_clarity.score,
    },
    {
      type: 'Grammar and language',
      score: feedback?.grammar_and_language.score,
    },
    { type: 'Skills and keywords', score: feedback?.skills_and_keywords.score },
    {
      type: 'Education',
      score: feedback?.education.score,
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
