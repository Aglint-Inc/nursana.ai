import { useInterview } from '@/interview/hooks/useInterview';

export const Page = () => {
  const interview = useInterview();
  return <div>{JSON.stringify(interview)}</div>;
};
