import dynamic from 'next/dynamic';

const InterviewAnalysis = dynamic(
  () =>
    import('@/dashboard/components/InterviewAnalysis').then(
      (module) => module.InterviewAnalysis,
    ),
  {
    ssr: false,
    loading: () => null, // Provide a loading component if needed
  },
);

export default function InterviewFeedbackPage() {
  return <InterviewAnalysis />;
}
