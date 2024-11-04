import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import { CardTitle } from '@/components/ui/card';
import { Tooltip } from '@/components/ui/tooltip';
import { CHART_COLORS } from '@/version/constant';
import { useResumeAnalysis } from '@/version/hooks/reports/useResumeAnalysis';

import ChartWrapper from '../ChartWrapper';

const CustomLabel = (props: any) => {
  const { x, y, value, height, name } = props;
  return (
    <text
      x={x + 5}
      y={y + height / 2}
      fill='#fff'
      textAnchor='start'
      dominantBaseline='middle'
    >
      {`${name}: ${value}`}
    </text>
  );
};

function ExperienceDistribution() {
  const { data, error, isPending } = useResumeAnalysis();
  const experienceData = data.experienceDistribution || [];
  return (
    <ChartWrapper
      header={
        <CardTitle className='text-md font-semi-bold'>
          Experience Distribution
        </CardTitle>
      }
      isLoading={isPending}
      error={error?.message}
      height='300px'
    >
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          layout='vertical'
          data={experienceData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' horizontal={false} />
          <XAxis type='number' hide />
          <YAxis dataKey='name' type='category' scale='band' hide />
          <Tooltip />
          <Bar dataKey='value' barSize={40}>
            {experienceData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={CHART_COLORS[index % CHART_COLORS.length]}
              />
            ))}
            <LabelList content={CustomLabel} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
{
  /* <Card>
  <CardHeader>
    <CardTitle className='text-md font-semi-bold'>
      Experience Distribution
    </CardTitle>
  </CardHeader>
  <CardContent className='h-[300px]'>
  
  </CardContent>
</Card>; */
}

export default ExperienceDistribution;
