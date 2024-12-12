import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';

export const useTrackOpened = ({ interviewId }: { interviewId: string }) => {
  const posthog = usePostHog();
  useEffect(() => {
    const hasCaptured = localStorage.getItem(
      `stage_start_interview-${interviewId}`,
    );
    if (!hasCaptured) {
      posthog.capture('interview-opened');
      localStorage.setItem(`stage_start_interview-${interviewId}`, 'true');
    }
  }, []);

  return null;
};
