import { ScanSearch } from 'lucide-react';
import React from 'react';

function WaitingForMatch() {
  return (
    <div className='w-full rounded-lg bg-purple-50 p-6 py-10'>
      <div className='flex flex-col items-center text-center gap-2'>
        <ScanSearch size={50} strokeWidth={1.5} className='text-purple-600'/>
        <div className='flex items-center gap-2'>
        <div className='text-xl font-medium '>
          We’re Finding the Best Job Matches for You!
        </div>
        </div>
        <div className='text-md text-muted-foreground'>
          Based on your preferences, Nursana.ai is searching for the perfect job
          opportunities. Your matches will appear here soon. Check back shortly
          to explore them!
        </div>
      </div>
    </div>
  );
}

export default WaitingForMatch;
