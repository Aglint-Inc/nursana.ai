import NotAvailable from '@/dashboard/components/NotAvailable';
import { useApplicantDetail } from './Context';
import { House, Sparkles } from 'lucide-react';
import RadialProgress from '@/dashboard/components/RadialProgress';
import { Button } from '@/components/ui/button';

export const Home = () => {
  return (
    <div>
      <Header />
      <Progress />
    </div>
  );
};

const Header = () => {
  const { data } = useApplicantDetail();
  const { user } = data;
  return (
    <div className='m-4'>
      <h1 className='text-2xl font-semibold'>Home</h1>
      <div className='mt-4 flex items-center gap-6'>
        <p>
          {user.user.first_name} {' ' + user.user.last_name}
        </p>

        <p>{user.user.email}</p>
        <p>{user.phone_number}</p>
      </div>
    </div>
  );
};

const Progress = () => {
  const { data } = useApplicantDetail();
  const { analysis, resume } = data;
  const { overallScore } = resume?.resume_feedback || {};

  if (!analysis?.structured_analysis?.overall_score || !overallScore) {
    return (
      <NotAvailable
        heading='Data temporarily unavailable'
        description='We’re currently analyzing the data. Please check back in a little while for updated information.'
        Icon={House}
      />
    );
  }

  const InterviewScore = [
    {
      name: 'Score',
      value: analysis.structured_analysis?.overall_score || 0,
      fill: '#8b5cf6',
      path: '#ddd6fe',
    },
  ];

  const ResumeScore = [
    {
      name: 'Score',
      value: overallScore,
      fill: '#db2777',
      path: '#fbcfe8',
    },
  ];

  return (
    <div className='flex gap-4'>
      <div className='flex flex-col items-center gap-2 rounded-lg bg-purple-50 p-4'>
        <div className='mb-[-32px] mt-[10px] font-medium text-purple-600'>
          Interview Score
        </div>
        <RadialProgress chartData={InterviewScore} size={250} />
        <Button className='w-full'>View Detail</Button>
      </div>
      <div className='flex flex-col items-center gap-2 rounded-lg bg-pink-50 p-4'>
        <div className='mb-[-32px] mt-[10px] font-medium text-pink-600'>
          Resume Score
        </div>
        <RadialProgress chartData={ResumeScore} size={250} />
        <Button className='w-full'>View Detail</Button>
      </div>
    </div>
  );
};
