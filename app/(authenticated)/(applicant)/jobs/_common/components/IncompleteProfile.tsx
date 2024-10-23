import React from 'react';

function IncompleteProfile() {
  return (
    <div className='w-full bg-muted p-6 rounded-lg'>
      <div className='flex flex-col gap-2'>
        <div className='text-xl font-medium text-yellow-600'>
          🔒 Complete Your Profile to Unlock More Job Matches!
        </div>
        <div className='text-md text-muted-foreground'>
          To increase your chances of finding the perfect job, complete your
          profile now. It takes only a few minutes and will help us match you
          with the best opportunities.
        </div>
      </div>
    </div>
  );
}

export default IncompleteProfile;
