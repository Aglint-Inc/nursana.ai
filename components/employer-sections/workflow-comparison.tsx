'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Clock } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const processes = [
  {
    title: 'Identify',
    description: 'Target companies or schools',
    timeBefore: 8,
  },
  {
    title: 'Find',
    description: 'Suitable candidates to reach out to',
    timeBefore: 8,
  },
  {
    title: 'Personalize',
    description: 'Hyper-personalization and outreach',
    timeBefore: 8,
  },
  {
    title: 'Engage',
    description: 'Multi-channel engagement with prospects',
    timeBefore: 8,
  },
  {
    title: 'Convert',
    description: 'Move to qualified interviews',
    timeBefore: 8,
  },
];

const totalTimeBefore = processes.reduce(
  (sum, process) => sum + process.timeBefore,
  0,
);
const totalTimeAfter = 0.5; // Assuming Nursana takes 30 minutes for the entire process
const timeSaved = totalTimeBefore - totalTimeAfter;

export function BeforeAfterComparison() {
  return (
    <section className='w-full py-12 md:py-24 lg:py-32'>
      <div className='container px-4 md:px-6'>
        <div className='mb-8 space-y-4 text-center'>
          <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
            The Nursana Advantage
          </h2>
          <p className='text-lg text-muted-foreground'>
            Save up to 40 hours per week per hire on recruiting
          </p>
        </div>
        <div className='relative grid gap-24 lg:grid-cols-2'>
          <Card className='border-2 border-red-600 bg-white shadow-lg'>
            <CardHeader className='rounded-t-lg bg-red-100'>
              <CardTitle className='text-2xl font-semibold text-red-800'>
                Traditional Process
              </CardTitle>
            </CardHeader>
            <CardContent className='pt-6'>
              {processes.map((process, index) => (
                <motion.div
                  key={process.title}
                  className='mb-4 flex items-center justify-between'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div>
                    <h3 className='font-semibold'>{process.title}</h3>
                    <p className='text-sm text-gray-600'>
                      {process.description}
                    </p>
                  </div>
                  <div className='flex items-center text-red-600'>
                    <Clock className='mr-1 h-4 w-4' />
                    <span>{process.timeBefore} hours</span>
                  </div>
                </motion.div>
              ))}
              <div className='mt-6 flex items-center justify-between border-t border-gray-200 pt-4'>
                <span className='font-semibold'>Total Time:</span>
                <span className='text-lg font-bold text-red-600'>
                  {totalTimeBefore} hours
                </span>
              </div>
            </CardContent>
          </Card>

          <div className='absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 lg:block'>
            <Badge
              variant='secondary'
              className='rounded-full bg-slate-800 px-3 py-3 text-2xl font-bold text-white shadow-lg'
            >
              VS
            </Badge>
          </div>

          <Card className='relative border-2 border-green-600 bg-white shadow-lg'>
            <CardHeader className='rounded-t-lg bg-green-100'>
              <CardTitle className='text-2xl font-semibold text-green-800'>
                Nursana AI
              </CardTitle>
            </CardHeader>
            <CardContent className='pt-6'>
              <motion.div
                className='mb-4 flex items-center justify-between'
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div>
                  <h3 className='font-semibold'>Entire Recruitment Process</h3>
                  <p className='text-sm text-gray-600'>
                    AI-powered end-to-end automation
                  </p>
                </div>
                <div className='flex items-center text-green-600'>
                  <Clock className='mr-1 h-4 w-4' />
                  <span>{totalTimeAfter} hours</span>
                </div>
              </motion.div>
              <div className='mb-6 space-y-3'>
                <motion.div
                  className='flex items-start gap-2'
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <CheckCircle className='mt-1 h-4 w-4 flex-shrink-0 text-green-600' />
                  <p className='text-sm text-gray-600'>
                    Instant setup with minimal configuration required
                  </p>
                </motion.div>

                <motion.div
                  className='flex items-start gap-2'
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <CheckCircle className='mt-1 h-4 w-4 flex-shrink-0 text-green-600' />
                  <p className='text-sm text-gray-600'>
                    Infinitely scalable - expand or contract capacity as needed
                  </p>
                </motion.div>

                <motion.div
                  className='flex items-start gap-2'
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <CheckCircle className='mt-1 h-4 w-4 flex-shrink-0 text-green-600' />
                  <p className='text-sm text-gray-600'>
                    Always on - operates 24/7 without interruption
                  </p>
                </motion.div>

                <motion.div
                  className='flex items-start gap-2'
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <CheckCircle className='mt-1 h-4 w-4 flex-shrink-0 text-green-600' />
                  <p className='text-sm text-gray-600'>
                    Continuously learns and improves over time
                  </p>
                </motion.div>

                <motion.div
                  className='flex items-start gap-2'
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <CheckCircle className='mt-1 h-4 w-4 flex-shrink-0 text-green-600' />
                  <p className='text-sm text-gray-600'>
                    Minimal management and administrative overhead
                  </p>
                </motion.div>

                <motion.div
                  className='flex items-start gap-2'
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <CheckCircle className='mt-1 h-4 w-4 flex-shrink-0 text-green-600' />
                  <p className='text-sm text-gray-600'>
                    Multi-lingual support with personalized, well-researched
                    interactions
                  </p>
                </motion.div>

                <motion.div
                  className='flex items-start gap-2'
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <CheckCircle className='mt-1 h-4 w-4 flex-shrink-0 text-green-600' />
                  <p className='text-sm text-gray-600'>
                    Operates autonomously in the background on autopilot
                  </p>
                </motion.div>
              </div>
              <div className='absolute bottom-0 left-0 right-0 flex flex-col items-center justify-between rounded-b-lg bg-purple-50 p-4 md:flex-row'>
                <div className='mb-3 md:mb-0'>
                  <h3 className='text-xl font-bold text-purple-800'>
                    Total Time Saved
                  </h3>
                  <p className='text-sm text-purple-600'>
                    Boost your recruitment efficiency
                  </p>
                </div>
                <div className='flex items-center'>
                  <CheckCircle className='mr-2 h-6 w-6 text-purple-600' />
                  <span className='text-2xl font-bold text-purple-800'>
                    {timeSaved} hours
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
