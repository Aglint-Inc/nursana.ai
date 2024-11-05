/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';

// import ApplicantLeaderboard from './reports/applicantLeaderboard';
import ExperienceDistribution from './reports/experienceDistribution';
// import InterviewCompletion from './reports/interviewCompletion';
// import InterviewHireTrends from './reports/interviewHireTrends';
import LicensesDistribution from './reports/licensesDistribution';
import LocationBasedBreakdown from './reports/locationBasedBreakdown';
// import PerformanceMetrics from './reports/performanceMetrics';
// import PreferredJobTypes from './reports/preferredJobTypes';
import PreviousJobTitles from './reports/previousJobTitles';
import StatsCards from './reports/statsCards';
import TopSkillsIdentified from './reports/topSkillsIdentified';
import UniversityDistribution from './reports/universityDistribution';

// Mock data - replace with actual data from your backend

export function VersionDashboard() {
  return (
    <div className='container w-full space-y-4 p-4'>
      <StatsCards />
      {/* <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <InterviewHireTrends />
        <InterviewCompletion />
      </div> */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-2'>
        <ExperienceDistribution />
        <UniversityDistribution />
        <PreviousJobTitles />
        <TopSkillsIdentified />
        {/* <ApplicantLeaderboard /> */}
        <LicensesDistribution />
        <LocationBasedBreakdown />
      </div>
      
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {/* <PreferredJobTypes /> */}
      </div>
      {/* <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <PerformanceMetrics />
      </div> */}
      <div className='grid gap-4'></div>
    </div>
  );
}
