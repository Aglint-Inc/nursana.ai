import {  TriangleAlert } from 'lucide-react';
import React from 'react';

import { Button } from './ui/button';

function Retry() {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className='flex h-[50vh] flex-col items-center justify-center gap-4'>
      <TriangleAlert size={60} className='text-red-500' strokeWidth={1.3} />
      <p>Something went wrong. Please retry.</p>
      <Button onClick={handleRetry}>Retry</Button>
    </div>
  );
}

export default Retry;