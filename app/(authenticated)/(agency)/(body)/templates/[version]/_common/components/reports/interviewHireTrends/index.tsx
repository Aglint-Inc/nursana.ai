import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip } from '@/components/ui/tooltip';
import { CHART_COLORS } from '@/version/constant';

const timelineData = [
  { month: 'Jan', interviews: 120, hires: 30 },
  { month: 'Feb', interviews: 150, hires: 35 },
  { month: 'Mar', interviews: 180, hires: 45 },
  { month: 'Apr', interviews: 220, hires: 55 },
  { month: 'May', interviews: 250, hires: 60 },
  { month: 'Jun', interviews: 280, hires: 70 },
];

function InterviewHireTrends() {
  return (
    <Card className='col-span-2'>
      <CardHeader>
        <CardTitle className='text-md font-semi-bold'>
          Interview and Hire Trends
        </CardTitle>
      </CardHeader>
      <CardContent className='h-[300px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='month' />
            <YAxis yAxisId='left' />
            <YAxis yAxisId='right' orientation='right' />
            <Tooltip />
            <Legend />
            <Line
              yAxisId='left'
              type='monotone'
              dataKey='interviews'
              stroke={CHART_COLORS[0]}
              activeDot={{ r: 8 }}
            />
            <Line
              yAxisId='right'
              type='monotone'
              dataKey='hires'
              stroke={CHART_COLORS[1]}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default InterviewHireTrends;
