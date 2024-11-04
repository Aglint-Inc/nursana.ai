import React from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip } from '@/components/ui/tooltip';

const CHART_COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

const completionData = [
  { stage: 'Started', candidates: 1000 },
  { stage: 'Completed', candidates: 750 },
  { stage: 'Interviewed', candidates: 500 },
  { stage: 'Hired', candidates: 200 },
];

function InterviewCompletion() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-md font-semi-bold'>
          Interview Completion
        </CardTitle>
      </CardHeader>
      <CardContent className='h-[300px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <AreaChart
            data={completionData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='stage' tick={{ fill: '#666', fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <defs>
              <linearGradient id='colorGradient' x1='0' y1='0' x2='1' y2='0'>
                <stop offset='0%' stopColor={CHART_COLORS[0]} />
                <stop offset='100%' stopColor={CHART_COLORS[1]} />
              </linearGradient>
            </defs>
            <Area
              type='monotone'
              dataKey='candidates'
              stroke='url(#colorGradient)'
              fill='url(#colorGradient)'
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default InterviewCompletion;
