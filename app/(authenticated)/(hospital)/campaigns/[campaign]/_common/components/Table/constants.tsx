'use client';

import { subHours } from 'date-fns';

import { INTERVIEW_STAGES } from '@/campaign/constants';
import type { ColumnSchema } from '@/campaign/types';
import type {
  DataTableFilterField,
  Option,
} from '@/components/fancy-data-table/types';
import { cn } from '@/utils/cn';

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
    name: 'Mr.A BC',
    email: 'abc@gmail.com',
    job_title: 'ABC',
    interview_stage: 'not_started',
    id: 'abc',
    updated_at: subHours(new Date(), 10).toISOString(),
    expected_salary: '2000',
    terms_accepted: false,
  },
  {
    email: 'def@gmail.com',
    name: 'Mr.D EF',
    id: 'def',
    interview_stage: 'interview_inprogress',
    job_title: 'DEF',
    updated_at: subHours(new Date(), 10).toISOString(),
    expected_salary: '2000',
    terms_accepted: true,
  },
] satisfies ColumnSchema[];
