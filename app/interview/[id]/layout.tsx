import { unstable_noStore } from 'next/cache';
import { api } from 'trpc/server';

export default async function InterviewLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  unstable_noStore();
  void api.interview.getInterviewDetails.prefetch({ interview_id: params.id });

  return <div className=''>{children}</div>;
}
