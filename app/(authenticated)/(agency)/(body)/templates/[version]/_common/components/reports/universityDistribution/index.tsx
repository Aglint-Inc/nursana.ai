import React from 'react';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { CardTitle } from '@/components/ui/card';
import { CHART_COLORS } from '@/version/constant';
import { useResumeAnalysis } from '@/version/hooks/reports/useResumeAnalysis';

import ChartWrapper from '../ChartWrapper';

function UniversityDistribution() {
  const { data, error, isPending } = useResumeAnalysis();
  const universityData = data.universityDistribution || [];
  return (
    <ChartWrapper
      header={
        <CardTitle className='text-md font-semi-bold'>
          University Distribution
        </CardTitle>
      }
      isLoading={isPending}
      error={error?.message}
      height='300px'
    >
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
            // label={({ name, percent }) =>
            //   `${name} ${(percent * 100).toFixed(0)}%`
            // }
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
          <Legend
            layout='horizontal'
            align='center'
            verticalAlign='bottom'
            wrapperStyle={{
              paddingTop: '20px',
              // maxHeight: '100px',
              // overflow: 'auto',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}

export default UniversityDistribution;
