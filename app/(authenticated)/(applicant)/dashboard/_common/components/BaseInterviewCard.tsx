import React from 'react'

import { Button } from '@/components/ui/button';

import RadialProgress from './RadialProgress'


const ResumeScore = [
    {
      name: 'Score',
      value: 17,
      fill: '#db2777',
      path: '#fbcfe8',
    },
  ];

function BaseInterviewCard() {
  return (
    <div className='w-full bg-muted p-6 rounded-lg'>
        <div className='grid grid-cols-2'>
        <Button>View Detail</Button>
        <RadialProgress chartData={ResumeScore} size={200} />
        </div>
    </div>
  )
}

export default BaseInterviewCard