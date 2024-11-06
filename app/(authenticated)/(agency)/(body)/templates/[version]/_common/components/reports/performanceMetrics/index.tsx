import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CHART_COLORS, skillsData } from '@/version/constant';

function PerformanceMetrics() {
  return (
    <Card className='col-span-2'>
      <CardHeader>
        <CardTitle className='text-md font-semi-bold'>
          Performance Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className='h-[400px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={skillsData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Bar dataKey='value'>
              {skillsData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default PerformanceMetrics;
