'use client';

import {
  AlertTriangle,
  ArrowUp,
  Award,
  Brain,
  ChevronDown,
  ChevronRight,
  Clock,
  GraduationCap,
  Hospital,
  MapPin,
  ThumbsUp,
  Users,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Funnel,
  FunnelChart,
  LabelList,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Text,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Mock data - replace with actual data from your backend
const completionData = [
  { stage: 'Started', candidates: 1000 },
  { stage: 'Completed', candidates: 750 },
  { stage: 'Interviewed', candidates: 500 },
  { stage: 'Hired', candidates: 200 },
];

const skillsData = [
  { name: 'Clinical Skills', value: 85 },
  { name: 'Communication', value: 78 },
  { name: 'Critical Thinking', value: 72 },
  { name: 'Empathy', value: 80 },
  { name: 'Time Management', value: 68 },
];

const timelineData = [
  { month: 'Jan', interviews: 120, hires: 30 },
  { month: 'Feb', interviews: 150, hires: 35 },
  { month: 'Mar', interviews: 180, hires: 45 },
  { month: 'Apr', interviews: 220, hires: 55 },
  { month: 'May', interviews: 250, hires: 60 },
  { month: 'Jun', interviews: 280, hires: 70 },
];

const demographicData = [
  { name: '0-2 Years', value: 30 },
  { name: '3-5 Years', value: 25 },
  { name: '6-10 Years', value: 20 },
  { name: '11+ Years', value: 25 },
];

const universityData = [
  { name: 'University X', value: 200 },
  { name: 'College Y', value: 180 },
  { name: 'Institute Z', value: 150 },
  { name: 'School W', value: 120 },
  { name: 'Others', value: 100 },
];

const CHART_COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

const CustomBarLabel = (props: any) => {
  const { x, y, width, value, height } = props;
  return (
    <Text
      x={x + width - 5}
      y={y + height / 2}
      fill='#000'
      textAnchor='end'
      dominantBaseline='middle'
    >
      {value}
    </Text>
  );
};

const experienceData = [
  { name: '11+ Years', value: 25 },
  { name: '6-10 Years', value: 20 },
  { name: '3-5 Years', value: 25 },
  { name: '0-2 Years', value: 30 },
];

const previousJobTitleData = [
  { name: 'Registered Nurse', value: 300 },
  { name: 'Licensed Practical Nurse', value: 200 },
  { name: 'Nurse Practitioner', value: 150 },
  { name: 'Clinical Nurse Specialist', value: 100 },
  { name: 'Others', value: 250 },
];

const CustomLabel = (props: any) => {
  const { x, y, width, value, height, name } = props;
  return (
    <text
      x={x + 5}
      y={y + height / 2}
      fill='#fff'
      textAnchor='start'
      dominantBaseline='middle'
    >
      {`${name}: ${value}`}
    </text>
  );
};

const licenseData = [
  { name: 'RN', value: 500 },
  { name: 'LPN', value: 300 },
  { name: 'NP', value: 150 },
  { name: 'CNS', value: 50 },
];

const locationData = [
  { name: 'New York', value: 300 },
  { name: 'California', value: 250 },
  { name: 'Texas', value: 200 },
  { name: 'Florida', value: 150 },
  { name: 'Illinois', value: 100 },
];

const jobTypeData = [
  { name: 'Full-time', value: 600 },
  { name: 'Part-time', value: 250 },
  { name: 'Contract', value: 100 },
  { name: 'Per Diem', value: 50 },
];

// Enhanced mock data for the leaderboard
const leaderboardData = [
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

// Applicant Leaderboard Component
function ApplicantLeaderboard() {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle className='text-md font-semi-bold'>Top Applicants</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        {leaderboardData.map((applicant, index) => (
          <div key={applicant.id} className='border-b pb-4 last:border-b-0'>
            <div
              className='flex cursor-pointer items-center justify-between'
              onClick={() => toggleRow(applicant.id)}
            >
              <div className='flex items-center space-x-2'>
                <Badge variant='outline'>{index + 1}</Badge>
                <span className='font-medium'>{applicant.name}</span>
              </div>
              <Badge>{applicant.overallFit}% fit</Badge>
              {expandedRows.includes(applicant.id) ? (
                <ChevronDown size={20} />
              ) : (
                <ChevronRight size={20} />
              )}
            </div>
            {expandedRows.includes(applicant.id) && (
              <div className='mt-2 space-y-2 text-sm'>
                <div className='flex items-center space-x-2'>
                  <Award size={16} />
                  <span>{applicant.licenseMatch.details}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <MapPin size={16} />
                  <span>{applicant.locationMatch.details}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <Hospital size={16} />
                  <span>{applicant.hospitalMatch.details}</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <GraduationCap size={16} />
                  <span>{applicant.schoolMatch.details}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

const skillGapData = [
  { name: 'Clinical Skills', required: 90, actual: 85 },
  { name: 'Communication', required: 85, actual: 78 },
  { name: 'Critical Thinking', required: 80, actual: 72 },
  { name: 'Empathy', required: 75, actual: 80 },
  { name: 'Time Management', required: 70, actual: 68 },
];

export default function ConsolidatedInterviewDashboard() {
  return (
    <div className='container mx-auto space-y-4 p-4'>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-5'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Total Interviews
            </CardTitle>
            <Users className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>1,000</div>
            <p className='text-xs text-muted-foreground'>
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Completion Rate
            </CardTitle>
            <ArrowUp className='h-4 w-4 text-green-500' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>75%</div>
            <p className='text-xs text-muted-foreground'>+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Avg. Interview Duration
            </CardTitle>
            <Clock className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>23m 14s</div>
            <p className='text-xs text-muted-foreground'>
              -2m 30s from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>Hire Rate</CardTitle>
            <Award className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>26.7%</div>
            <p className='text-xs text-muted-foreground'>
              +2.3% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              Candidate Satisfaction
            </CardTitle>
            <ThumbsUp className='h-4 w-4 text-muted-foreground' />
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold'>4.7/5</div>
            <p className='text-xs text-muted-foreground'>
              Based on post-interview surveys
            </p>
          </CardContent>
        </Card>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card className='col-span-2'>
          <CardHeader>
            <CardTitle className='text-md font-semi-bold'>
              Interview and Hire Trends
            </CardTitle>
          </CardHeader>
          <CardContent className='h-[300px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='month' />
                <YAxis yAxisId='left' />
                <YAxis yAxisId='right' orientation='right' />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId='left'
                  type='monotone'
                  dataKey='interviews'
                  stroke={CHART_COLORS[0]}
                  activeDot={{ r: 8 }}
                />
                <Line
                  yAxisId='right'
                  type='monotone'
                  dataKey='hires'
                  stroke={CHART_COLORS[1]}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='text-md font-semi-bold'>
              Interview Completion
            </CardTitle>
          </CardHeader>
          <CardContent className='h-[300px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <AreaChart
                data={completionData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='stage' tick={{ fill: '#666', fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <defs>
                  <linearGradient
                    id='colorGradient'
                    x1='0'
                    y1='0'
                    x2='1'
                    y2='0'
                  >
                    <stop offset='0%' stopColor={CHART_COLORS[0]} />
                    <stop offset='100%' stopColor={CHART_COLORS[1]} />
                  </linearGradient>
                </defs>
                <Area
                  type='monotone'
                  dataKey='candidates'
                  stroke='url(#colorGradient)'
                  fill='url(#colorGradient)'
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card>
          <CardHeader>
            <CardTitle className='text-md font-semi-bold'>
              Experience Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className='h-[300px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart
                layout='vertical'
                data={experienceData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray='3 3' horizontal={false} />
                <XAxis type='number' hide />
                <YAxis dataKey='name' type='category' scale='band' hide />
                <Tooltip />
                <Bar dataKey='value' barSize={40}>
                  {experienceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                  <LabelList content={CustomLabel} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='text-md font-semi-bold'>
              University Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className='h-[300px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={universityData}
                  cx='50%'
                  cy='50%'
                  innerRadius={60}
                  outerRadius={80}
                  fill='#8884d8'
                  dataKey='value'
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  paddingAngle={5}
                >
                  {universityData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='text-md font-semi-bold'>
              Previous Job Titles
            </CardTitle>
          </CardHeader>
          <CardContent className='h-[300px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart
                data={previousJobTitleData}
                layout='vertical'
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray='3 3' horizontal={false} />
                <XAxis type='number' hide />
                <YAxis dataKey='name' type='category' hide />
                <Tooltip />
                <Bar dataKey='value' barSize={40}>
                  {previousJobTitleData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                  <LabelList content={CustomLabel} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card className='col-span-2'>
          <CardHeader>
            <CardTitle className='text-md font-semi-bold'>
              Top Skills Identified
            </CardTitle>
          </CardHeader>
          <CardContent className='h-[300px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart
                layout='vertical'
                data={skillsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray='3 3' horizontal={false} />
                <XAxis type='number' hide />
                <YAxis dataKey='name' type='category' scale='band' hide />
                <Tooltip />
                <Bar dataKey='value' barSize={40}>
                  {skillsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                  <LabelList content={CustomLabel} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <ApplicantLeaderboard />
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card>
          <CardHeader>
            <CardTitle className='text-md font-semi-bold'>
              Licenses Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className='h-[300px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={licenseData}
                  cx='50%'
                  cy='50%'
                  innerRadius={60}
                  outerRadius={80}
                  fill='#8884d8'
                  dataKey='value'
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  paddingAngle={5}
                >
                  {licenseData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='text-md font-semi-bold'>
              Location-based Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className='h-[300px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={locationData}
                  cx='50%'
                  cy='50%'
                  innerRadius={60}
                  outerRadius={80}
                  fill='#8884d8'
                  dataKey='value'
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  paddingAngle={5}
                >
                  {locationData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className='text-md font-semi-bold'>
              Preferred Job Types
            </CardTitle>
          </CardHeader>
          <CardContent className='h-[300px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={jobTypeData}
                  cx='50%'
                  cy='50%'
                  innerRadius={60}
                  outerRadius={80}
                  fill='#8884d8'
                  dataKey='value'
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  paddingAngle={5}
                >
                  {jobTypeData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <Card className='col-span-2'>
          <CardHeader>
            <CardTitle className='text-md font-semi-bold'>
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className='h-[400px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={skillsData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Bar dataKey='value'>
                  {skillsData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className='grid gap-4'>
        <Card>
          <CardHeader>
            <CardTitle className='text-md font-semi-bold'>
              Skill Gap Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className='h-[400px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={skillGapData}>
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey='required'
                  fill={CHART_COLORS[0]}
                  name='Required Skill Level'
                />
                <Bar
                  dataKey='actual'
                  fill={CHART_COLORS[1]}
                  name='Actual Skill Level'
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
