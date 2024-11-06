import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { CHART_COLORS, skillGapData } from '../../contant';
// import { useResumeAnalysis } from '../../hook/useResumeAnalysis';

function SkillGapAnalysis() {
  // const { data } = useResumeAnalysis();
  // const skillGapData = data.skills || [];
  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-md font-semi-bold'>
          Skill Gap Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className='h-[400px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart data={skillGapData}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey='required'
              fill={CHART_COLORS[0]}
              name='Required Skill Level'
            />
            <Bar
              dataKey='actual'
              fill={CHART_COLORS[1]}
              name='Actual Skill Level'
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default SkillGapAnalysis;
