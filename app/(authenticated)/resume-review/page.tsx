import dynamic from 'next/dynamic';

const ResumeFeedback = dynamic(
  () =>
    import('../dashboard/@user/_common/components/ResumeFeedback').then(
      (module) => module.ResumeFeedback,
    ),
  {
    ssr: false,
    loading: () => null, // Provide a loading component if needed
  },
);

export default function InterviewFeedbackPage() {
  return <ResumeFeedback />;
}
