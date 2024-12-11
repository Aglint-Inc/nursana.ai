import { Clock, LineChart, Shield, Star } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';

import { BookingSection } from './booking-section';
import { TransformHiringProcess } from './TransformHiringProcess';
import { BeforeAfterComparison } from './workflow-comparison';

export function EmployerMainContent() {
  return (
    <>
      <section className='w-full bg-white py-12 dark:bg-gray-800 md:py-24 lg:py-32'>
        <div className='container px-4 md:px-6'>
          <div className='grid gap-10 px-10 md:gap-16 lg:grid-cols-2'>
            <div className='space-y-4'>
              <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
                Turbocharge Your Recruiting Efficiency
              </h2>
              <p className='text-gray-500 dark:text-gray-400'>
                Nursana automates the entire recruiting workflow while providing
                full visibility and control. Save time, reduce costs, and
                improve quality of hire.
              </p>
            </div>
            <div className='grid gap-4 md:grid-cols-2'>
              {/* Cards */}
              <Card>
                <CardContent className='p-6'>
                  <Star className='mb-4 h-12 w-12 text-purple-600' />
                  <h3 className='mb-2 font-bold'>Continuous Learning</h3>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Nursana gets smarter with every interaction, improving
                    results over time
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-6'>
                  <Clock className='mb-4 h-12 w-12 text-purple-600' />
                  <h3 className='mb-2 font-bold'>Operates 24/7</h3>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Continuous candidate sourcing and screening, working around
                    the clock
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-6'>
                  <LineChart className='mb-4 h-12 w-12 text-purple-600' />
                  <h3 className='mb-2 font-bold'>Smart Analytics</h3>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Detailed insights on recruitment performance and candidate
                    quality
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className='p-6'>
                  <Shield className='mb-4 h-12 w-12 text-purple-600' />
                  <h3 className='mb-2 font-bold'>Quality Assured</h3>
                  <p className='text-sm text-gray-500 dark:text-gray-400'>
                    Nursana does in-depth screening to ensure only the best
                    candidates move forward
                  </p>
                </CardContent>
              </Card>

              {/* Repeat for other cards... */}
              {/* Similar structure for LineChart, Shield, and Star cards */}
            </div>
          </div>
        </div>
      </section>

      <TransformHiringProcess />
      <BeforeAfterComparison />

      <BookingSection />
    </>
  );
}
