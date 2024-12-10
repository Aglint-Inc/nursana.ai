'use client';

import Cal, { getCalApi } from '@calcom/embed-react';
import { useEffect } from 'react';

export function BookingSection() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal('ui', {
        hideEventTypeDetails: false,
        layout: 'month_view',
      });
    })();
  }, []);

  return (
    <section
      className='w-full bg-gray-50 py-12 md:py-24 lg:py-32'
      id='schedule-demo'
    >
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <div className='space-y-2'>
            <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
              Ready to Get Started?
            </h2>
            <p className='mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
              Join leading healthcare organizations already using Nursana to
              revolutionize their hiring process.
            </p>
          </div>

          <Cal
            calLink='aglinthq/30min'
            style={{
              width: '100%',
              height: '100%',
              minHeight: '600px',
              overflow: 'scroll',
            }}
            config={{
              layout: 'month_view',
              name: 'Nursana Consultation',
              theme: 'light',
            }}
          />
        </div>
      </div>
    </section>
  );
}
