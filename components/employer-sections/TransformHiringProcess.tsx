'use client';

import {
  Brain,
  CalendarClock,
  type LucideIcon,
  UserCheck,
  UserSearch,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface HiringStep {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  icon: LucideIcon;
}

const hiringSteps: HiringStep[] = [
  {
    id: 'ai-sourcing',
    title: 'AI Sourcing',
    description:
      'Intelligent candidate identification across multiple channels, leveraging AI to find the best potential matches for your healthcare positions.',
    benefits: [
      'Access to wider talent pools across multiple platforms',
      'AI-powered matching based on skills and experience',
      'Reduced sourcing time by up to 75%',
      'Higher quality candidate shortlists',
      'Automated candidate engagement',
      'Real-time market insights and analytics',
    ],
    icon: UserSearch,
  },
  {
    id: 'smart-screening',
    title: 'Smart Screening',
    description:
      "Automated qualification based on your specific requirements, using AI to evaluate candidates' skills, experience, and cultural fit.",
    benefits: [
      'Automated skills and qualification verification',
      'Personality and cultural fit assessment',
      'Standardized evaluation criteria',
      'Bias-free screening process',
      'Multi-language support',
      'Customizable screening workflows',
    ],
    icon: Brain,
  },
  {
    id: 'auto-scheduling',
    title: 'Auto Scheduling',
    description:
      'Effortless interview scheduling and candidate communication, streamlining the process and reducing administrative overhead.',
    benefits: [
      'Automated calendar coordination',
      'Instant interview confirmations',
      'Reduced no-show rates',
      'Seamless reminder system',
      'Multi-timezone support',
      'Integration with popular calendar apps',
    ],
    icon: CalendarClock,
  },
  {
    id: 'quality-hire',
    title: 'Quality Hires',
    description:
      'Improved candidate quality and reduced time-to-hire, resulting in better matches and more efficient recruitment processes.',
    benefits: [
      'Higher candidate retention rates',
      'Improved job satisfaction scores',
      'Faster onboarding process',
      'Better team culture fit',
      'Reduced hiring costs',
      'Data-driven hiring decisions',
    ],
    icon: UserCheck,
  },
];

export function TransformHiringProcess() {
  const [activeTab, setActiveTab] = useState(hiringSteps[0].id);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((current) => {
        const currentIndex = hiringSteps.findIndex(
          (step) => step.id === current,
        );
        const nextIndex = (currentIndex + 1) % hiringSteps.length;
        return hiringSteps[nextIndex].id;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className='w-full bg-purple-50 py-12 md:py-24 lg:py-32'>
      <div className='container px-4 md:px-6'>
        <div className='flex flex-col items-center justify-center space-y-4 text-center'>
          <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight'>
            Transform Your Hiring Process
          </h2>
          <p className='max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed'>
            Streamline your healthcare recruitment with Nursana. Set up in less
            than two weeks and start seeing results immediately.
          </p>
        </div>
        <div className='mx-auto mt-12 max-w-5xl'>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className='flex flex-col space-y-4 sm:flex-row sm:space-x-8 sm:space-y-0'
          >
            <TabsList className='h-fit w-full flex-col space-y-3 bg-transparent sm:w-64'>
              {hiringSteps.map((step) => (
                <TabsTrigger
                  key={step.id}
                  value={step.id}
                  className='flex h-24 w-full flex-col items-center justify-center space-y-2 rounded-lg data-[state=active]:bg-purple-600 data-[state=active]:text-white'
                >
                  <step.icon className='h-8 w-8' />
                  <span className='text-lg font-medium'>{step.title}</span>
                </TabsTrigger>
              ))}
            </TabsList>
            <div className='flex-1'>
              {hiringSteps.map((step) => (
                <TabsContent key={step.id} value={step.id}>
                  <Card className='border-2'>
                    <CardContent className='p-8'>
                      <div className='space-y-6'>
                        <div className='space-y-4'>
                          <h3 className='text-2xl font-bold'>{step.title}</h3>
                          <p className='text-lg text-gray-500'>
                            {step.description}
                          </p>
                        </div>
                        <ul className='space-y-3'>
                          {step.benefits.map((benefit, index) => (
                            <li
                              key={index}
                              className='flex items-center text-gray-600'
                            >
                              <span className='mr-3 h-3 w-3 rounded-full bg-purple-600'></span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
