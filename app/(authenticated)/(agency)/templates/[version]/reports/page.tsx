/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';

import StatsCards from './_common/components/statsCards';
import InterviewHireTrends from './_common/components/interviewHireTrends';
import InterviewCompletion from './_common/components/interviewCompletion';
import ExperienceDistribution from './_common/components/experienceDistribution';
import UniversityDistribution from './_common/components/universityDistribution';
import PreviousJobTitles from './_common/components/previousJobTitles';
import ApplicantLeaderboard from './_common/components/applicantLeaderboard';
import TopSkillsIdentified from './_common/components/topSkillsIdentified';
import LicensesDistribution from './_common/components/licensesDistribution';
import LocationBasedBreakdown from './_common/components/locationBasedBreakdown';
import PreferredJobTypes from './_common/components/preferredJobTypes';
import PerformanceMetrics from './_common/components/performanceMetrics';
import { useMatrixFilters } from './_common/context/matrixFilterProvider';

export default function ConsolidatedInterviewDashboard() {
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
