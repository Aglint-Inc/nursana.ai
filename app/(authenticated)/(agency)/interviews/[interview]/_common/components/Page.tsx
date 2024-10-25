import { useInterview } from '@/interview/hooks/useInterview';

const Page = () => {
  const interview = useInterview();
  return <div>{JSON.stringify(interview)}</div>;
};

export default Page;
