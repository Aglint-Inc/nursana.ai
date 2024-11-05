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

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip } from '@/components/ui/tooltip';

import { CHART_COLORS } from '../../contant';
import { useResumeAnalysis } from '../../hook/useResumeAnalysis';
import { CustomLabel } from '../../util/customLabel';

function TopSkillsIdentified() {
  const { data } = useResumeAnalysis();
  const skillsData = data.skills || [];
  return (
    <Card className='col-span-2'>
      <CardHeader>
        <CardTitle className='text-md font-semi-bold'>
          Top Skills Identified
        </CardTitle>
      </CardHeader>
      <CardContent className='h-[300px]'>
        <ResponsiveContainer width='100%' height='100%'>
          <BarChart
            layout='vertical'
            data={skillsData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray='3 3' horizontal={false} />
            <XAxis type='number' hide />
            <YAxis dataKey='name' type='category' scale='band' hide />
            <Tooltip />
            <Bar dataKey='value' barSize={40}>
              {skillsData.map((_, index) => (
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

export default TopSkillsIdentified;
