import dynamic from 'next/dynamic';

const InterviewTranscript = dynamic(
  () =>
    import('../dashboard/@user/_common/components/InterviewTranscript').then(
      (module) => module.InterviewTranscript,
    ),
  {
    ssr: false,
    loading: () => null, // Provide a loading component if needed
  },
);

export default function InterviewFeedbackPage() {
  return <InterviewTranscript />;
}
