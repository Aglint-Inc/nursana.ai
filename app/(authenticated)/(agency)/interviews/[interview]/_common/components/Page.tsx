import { useInterview } from '@/interview/hooks/useInterview';

const Page = () => {
  const interview = useInterview();
  return <div className='w-[200px]'>{JSON.stringify(interview)}</div>;
};

export default Page;
