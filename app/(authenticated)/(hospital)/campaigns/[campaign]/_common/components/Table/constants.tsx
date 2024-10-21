'use client';

import { subHours } from 'date-fns';

import type {
  DataTableFilterField,
  Option,
} from '@/components/fancy-data-table/types';
import { cn } from '@/utils/cn';

import { type ColumnSchema } from './schema';
import { INTERVIEW_STAGES } from './utils';

export const tagsColor = {
  not_started: {
    badge:
      'text-[#10b981] bg-[#10b981]/10 border-[#10b981]/20 hover:bg-[#10b981]/10',
    dot: 'bg-[#10b981]',
  },
  resume_submitted: {
    badge:
      'text-[#0ea5e9] bg-[#0ea5e9]/10 border-[#0ea5e9]/20 hover:bg-[#0ea5e9]/10',
    dot: 'bg-[#0ea5e9]',
  },
  interview_inprogress: {
    badge:
      'text-[#ec4899] bg-[#ec4899]/10 border-[#ec4899]/20 hover:bg-[#ec4899]/10',
    dot: 'bg-[#ec4899]',
  },
  interview_completed: {
    badge:
      'text-[#f97316] bg-[#f97316]/10 border-[#f97316]/20 hover:bg-[#f97316]/10',
    dot: 'bg-[#f97316]',
  },
} as Record<string, Record<'badge' | 'dot', string>>;

export const data = [
  {
    first_name: 'Mr.A',
    last_name: 'BC',
    email: 'abc@gmail.com',
    job_title: 'ABC',
    interview_stage: 'not_started',
    id: 'abc',
    updated_at: subHours(new Date(), 10).toISOString(),
  },
  {
    email: 'def@gmail.com',
    first_name: 'Mr.D',
    id: 'def',
    interview_stage: 'interview_inprogress',
    job_title: 'DEF',
    last_name: 'EF',
    updated_at: subHours(new Date(), 10).toISOString(),
  },
] satisfies ColumnSchema[];

export const filterFields = [
  {
    label: 'Time Range',
    value: 'updated_at',
    type: 'timerange',
    defaultOpen: true,
    commandDisabled: true,
  },
  {
    label: 'Email',
    value: 'email',
    type: 'input',
    options: data.map(({ email }) => ({ label: email, value: email })),
  },
  {
    label: 'Interview Stage',
    value: 'interview_stage',
    type: 'checkbox',
    defaultOpen: true,
    // REMINDER: "use client" needs to be declared in the file - otherwise getting serialization error from Server Component
    component: (props: Option) => {
      if (typeof props.value === 'boolean') return null;
      if (typeof props.value === 'undefined') return null;
      return (
        <div className='flex w-full items-center justify-between gap-2'>
          <span className='truncate font-normal'>{props.value}</span>
          <span
            className={cn('h-2 w-2 rounded-full', tagsColor[props.value].dot)}
          />
        </div>
      );
    },
    options: INTERVIEW_STAGES.map((tag) => ({ label: tag, value: tag })),
  },
] satisfies DataTableFilterField<ColumnSchema>[];
