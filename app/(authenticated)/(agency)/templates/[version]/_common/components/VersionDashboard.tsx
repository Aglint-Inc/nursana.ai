/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';

import {
  ArrowUp,
  Award,
  ChevronDown,
  ChevronRight,
  Clock,
  GraduationCap,
  Hospital,
  MapPin,
  ThumbsUp,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StatsCards from '@/reports/components/statsCards';
import InterviewHireTrends from '@/reports/components/interviewHireTrends';
import InterviewCompletion from '@/reports/components/interviewCompletion';
import ExperienceDistribution from '@/reports/components/experienceDistribution';
import UniversityDistribution from '@/reports/components/universityDistribution';
import PreviousJobTitles from '@/reports/components/previousJobTitles';
import TopSkillsIdentified from '@/reports/components/topSkillsIdentified';
import ApplicantLeaderboard from '@/reports/components/applicantLeaderboard';
import LicensesDistribution from '@/reports/components/licensesDistribution';
import LocationBasedBreakdown from '@/reports/components/locationBasedBreakdown';
import PreferredJobTypes from '@/reports/components/preferredJobTypes';
import PerformanceMetrics from '@/reports/components/performanceMetrics';
// Mock data - replace with actual data from your backend

export function VersionDashboard() {
  return (
    <div className='container w-full space-y-4 p-4'>
      <StatsCards />
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <InterviewHireTrends />
        <InterviewCompletion />
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <ExperienceDistribution />
        <UniversityDistribution />
        <PreviousJobTitles />
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <TopSkillsIdentified />
        <ApplicantLeaderboard />
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <LicensesDistribution />
        <LocationBasedBreakdown />
        <PreferredJobTypes />
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <PerformanceMetrics />
      </div>
      <div className='grid gap-4'></div>
    </div>
  );
}
