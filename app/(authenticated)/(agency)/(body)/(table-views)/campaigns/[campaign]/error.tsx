'use client';
import { TvMinimalPlay } from 'lucide-react';

const Error = () => {
  return (
    <div className='mx-auto flex h-[40vh] w-full max-w-3xl flex-col items-center justify-center gap-3'>
      <TvMinimalPlay className='h-10 w-10 text-purple-600' strokeWidth={1} />
      <div className='flex flex-col items-center justify-center gap-1'>
        <div className='text-lg font-medium'> No Interviews found </div>
      </div>
    </div>
  );
};

export default Error;
