export const completionData = [
  { stage: 'Started', candidates: 1000 },
  { stage: 'Completed', candidates: 750 },
  { stage: 'Interviewed', candidates: 500 },
  { stage: 'Hired', candidates: 200 },
];

export const skillsData = [
  { name: 'Clinical Skills', value: 85 },
  { name: 'Communication', value: 78 },
  { name: 'Critical Thinking', value: 72 },
  { name: 'Empathy', value: 80 },
  { name: 'Time Management', value: 68 },
];

export const timelineData = [
  { month: 'Jan', interviews: 120, hires: 30 },
  { month: 'Feb', interviews: 150, hires: 35 },
  { month: 'Mar', interviews: 180, hires: 45 },
  { month: 'Apr', interviews: 220, hires: 55 },
  { month: 'May', interviews: 250, hires: 60 },
  { month: 'Jun', interviews: 280, hires: 70 },
];

export const universityData = [
  { name: 'University X', value: 200 },
  { name: 'College Y', value: 180 },
  { name: 'Institute Z', value: 150 },
  { name: 'School W', value: 120 },
  { name: 'Others', value: 100 },
];

export const CHART_COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export const experienceData = [
  { name: '11+ Years', value: 25 },
  { name: '6-10 Years', value: 20 },
  { name: '3-5 Years', value: 25 },
  { name: '0-2 Years', value: 30 },
];

export const previousJobTitleData = [
  { name: 'Registered Nurse', value: 300 },
  { name: 'Licensed Practical Nurse', value: 200 },
  { name: 'Nurse Practitioner', value: 150 },
  { name: 'Clinical Nurse Specialist', value: 100 },
  { name: 'Others', value: 250 },
];

export const licenseData = [
  { name: 'RN', value: 500 },
  { name: 'LPN', value: 300 },
  { name: 'NP', value: 150 },
  { name: 'CNS', value: 50 },
];

export const locationData = [
  { name: 'New York', value: 300 },
  { name: 'California', value: 250 },
  { name: 'Texas', value: 200 },
  { name: 'Florida', value: 150 },
  { name: 'Illinois', value: 100 },
];

export const jobTypeData = [
  { name: 'Full-time', value: 600 },
  { name: 'Part-time', value: 250 },
  { name: 'Contract', value: 100 },
  { name: 'Per Diem', value: 50 },
];

// Enhanced mock data for the leaderboard
export const leaderboardData = [
  {
    id: 1,
    name: 'John Doe',
    licenseMatch: { score: 100, details: 'RN, LPN' },
    locationMatch: { score: 95, details: 'New York, NY' },
    overallFit: 98,
    hospitalMatch: { score: 90, details: 'Mount Sinai Hospital' },
    schoolMatch: { score: 85, details: 'Columbia University' },
  },
  {
    id: 2,
    name: 'Jane Smith',
    licenseMatch: { score: 100, details: 'RN, NP' },
    locationMatch: { score: 100, details: 'Los Angeles, CA' },
    overallFit: 97,
    hospitalMatch: { score: 85, details: 'Cedars-Sinai Medical Center' },
    schoolMatch: { score: 90, details: 'UCLA' },
  },
  // ... Add more detailed data for other applicants ...
];

export const skillGapData = [
  { name: 'Clinical Skills', required: 90, actual: 85 },
  { name: 'Communication', required: 85, actual: 78 },
  { name: 'Critical Thinking', required: 80, actual: 72 },
  { name: 'Empathy', required: 75, actual: 80 },
  { name: 'Time Management', required: 70, actual: 68 },
];
