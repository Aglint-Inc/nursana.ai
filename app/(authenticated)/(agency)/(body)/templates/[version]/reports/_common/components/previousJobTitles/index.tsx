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

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { CHART_COLORS } from '../../contant';
import { useResumeAnalysis } from '../../hook/useResumeAnalysis';
import { CustomLabel } from '../../util/customLabel';

function PreviousJobTitles() {
  const { data } = useResumeAnalysis();
  const previousJobTitleData = data.previousJobTitle || [];
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-md font-semi-bold'>
          Previous Job Titles
        </CardTitle>
      </CardHeader>
      <CardContent className='h-[300px]'>
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
      </CardContent>
    </Card>
  );
}

export default PreviousJobTitles;
