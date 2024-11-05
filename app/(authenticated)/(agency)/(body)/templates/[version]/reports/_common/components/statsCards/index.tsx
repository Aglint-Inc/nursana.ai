import { ArrowUp, Award, Clock, ThumbsUp, Users } from 'lucide-react';
import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { useStats } from '../../hook/useStats';
import ChartWrapper from '../ChartWrapper';

function StatsCards() {
  const { data, isPending, error } = useStats();
  return (
    <div className='grid h-[126] gap-4 md:grid-cols-2 lg:grid-cols-5'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Total Interviews
          </CardTitle>
          <Users className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <ChartWrapper
            isLoading={isPending}
            error={error}
            isEmpty={!data.total}
          >
            <div className='text-2xl font-bold'>{data.completed}</div>
            <p className='text-xs text-muted-foreground'>
              +20.1% from last month
            </p>
          </ChartWrapper>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Completion Rate</CardTitle>
          <ArrowUp className='h-4 w-4 text-green-500' />
        </CardHeader>
        <CardContent>
          <ChartWrapper
            isLoading={isPending}
            error={error}
            isEmpty={!data.total}
          >
            <div className='text-2xl font-bold'>{data.completionRate}%</div>
            <p className='text-xs text-muted-foreground'>+5% from last month</p>
          </ChartWrapper>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Avg. Interview Duration
          </CardTitle>
          <Clock className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <ChartWrapper
            isLoading={isPending}
            error={error}
            isEmpty={!data.total}
          >
            <div className='text-2xl font-bold'>
              {data.avgInterviewDuration}
            </div>
            <p className='text-xs text-muted-foreground'>
              -2m 30s from last month
            </p>
          </ChartWrapper>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Hire Rate</CardTitle>
          <Award className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>26.7%</div>
          <p className='text-xs text-muted-foreground'>+2.3% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>
            Candidate Satisfaction
          </CardTitle>
          <ThumbsUp className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>4.7/5</div>
          <p className='text-xs text-muted-foreground'>
            Based on post-interview surveys
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default StatsCards;
