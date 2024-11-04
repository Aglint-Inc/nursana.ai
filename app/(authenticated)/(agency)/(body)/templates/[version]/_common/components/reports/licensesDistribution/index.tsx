import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

import { CardTitle } from '@/components/ui/card';
import { Tooltip } from '@/components/ui/tooltip';
import { CHART_COLORS } from '@/version/constant';
import { useResumeAnalysis } from '@/version/hooks/reports/useResumeAnalysis';

import ChartWrapper from '../ChartWrapper';

function LicensesDistribution() {
  const { data, error, isPending } = useResumeAnalysis();
  const licenseData = data.licensesDistribution || [];
  return (
    <ChartWrapper
      header={
        <CardTitle className='text-md font-semi-bold'>
          Licenses Distribution
        </CardTitle>
      }
      isLoading={isPending}
      error={error?.message}
      height='300px'
    >
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart>
          <Pie
            data={licenseData}
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
            {licenseData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={CHART_COLORS[index % CHART_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}

export default LicensesDistribution;
