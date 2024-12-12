import { usePostHog } from 'posthog-js/react';
import { useState } from 'react';

import NursanaLogo from '@/components/nursana-logo';

import InitialExplanation from './InitialExplanation';
import Upload from './Upload';

type Steps = 'InitialExplanation' | 'ResumeUpload';

function StageResumeUpload() {
  const posthog = usePostHog();
  const [step, setStep] = useState<Steps>('InitialExplanation');

  const renderComponent = () => {
    switch (step) {
      case 'InitialExplanation':
        return (
          <InitialExplanation
            onNext={() => {
              posthog.capture('interview-start-preocess');
              setStep('ResumeUpload');
            }}
          />
        );
      case 'ResumeUpload':
        return <Upload />;
    }
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center gap-8'>
      <NursanaLogo />
      {renderComponent()}
    </div>
  );
}

export default StageResumeUpload;
