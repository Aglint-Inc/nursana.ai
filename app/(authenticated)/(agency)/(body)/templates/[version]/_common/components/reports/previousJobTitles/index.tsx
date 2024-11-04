import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { CardTitle } from '@/components/ui/card';
import { CHART_COLORS } from '@/version/constant';
import { useResumeAnalysis } from '@/version/hooks/reports/useResumeAnalysis';
import { CustomLabel } from '@/version/util/customLabel';

import ChartWrapper from '../ChartWrapper';

function PreviousJobTitles() {
  const { data, error, isPending } = useResumeAnalysis();
  const previousJobTitleData = data.previousJobTitle || [];
  return (
    <ChartWrapper
      header={
        <CardTitle className='text-md font-semi-bold'>
          Previous Job Titles
        </CardTitle>
      }
      isLoading={isPending}
      error={error?.message}
      height='300px'
    >
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          data={previousJobTitleData}
          layout='vertical'
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray='3 3' horizontal={false} />
          <XAxis type='number' hide />
          <YAxis dataKey='name' type='category' hide />
          <Tooltip />
          <Bar dataKey='value' barSize={40}>
            {previousJobTitleData.map((_, index) => (
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

export default PreviousJobTitles;
