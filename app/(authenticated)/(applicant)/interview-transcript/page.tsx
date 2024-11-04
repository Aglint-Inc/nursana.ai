import dynamic from 'next/dynamic';

const Transcript = dynamic(
  () =>
    import('@/dashboard/components/InterviewTranscript').then(
      (module) => module.Transcript,
    ),
  {
    ssr: false,
    loading: () => null, // Provide a loading component if needed
  },
);

export default function InterviewFeedbackPage() {
  return <Transcript />;
}
