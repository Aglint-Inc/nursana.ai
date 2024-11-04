import React from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { CHART_COLORS } from '../../contant';
import { useResumeAnalysis } from '../../hook/useResumeAnalysis';

function LocationBasedBreakdown() {
  const { data } = useResumeAnalysis();
  const locationData = data.locationsFrequency || [];
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-md font-semi-bold'>
          Location-based Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className='h-[300px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={locationData}
              cx='50%'
              cy='50%'
              innerRadius={60}
              outerRadius={80}
              fill='#8884d8'
              dataKey='value'
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              paddingAngle={5}
            >
              {locationData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default LocationBasedBreakdown;
