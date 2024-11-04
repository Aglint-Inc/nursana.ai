import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CHART_COLORS, jobTypeData } from '@/version/constant';

function PreferredJobTypes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-md font-semi-bold'>
          Preferred Job Types
        </CardTitle>
      </CardHeader>
      <CardContent className='h-[300px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <PieChart>
            <Pie
              data={jobTypeData}
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
              {jobTypeData.map((_, index) => (
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

export default PreferredJobTypes;
