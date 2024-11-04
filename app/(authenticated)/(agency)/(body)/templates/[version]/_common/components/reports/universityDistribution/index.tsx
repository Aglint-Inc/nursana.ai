import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip } from '@/components/ui/tooltip';
import { CHART_COLORS } from '@/version/constant';
import { useResumeAnalysis } from '@/version/hooks/reports/useResumeAnalysis';

function UniversityDistribution() {
  const { data } = useResumeAnalysis();
  const universityData = data.universityDistribution || [];
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-md font-semi-bold'>
          University Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className='h-[300px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={universityData}
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
              {universityData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CHART_COLORS[index % CHART_COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default UniversityDistribution;
