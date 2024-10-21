import { CheckCircle2, Circle, LoaderCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';

function MultiStepLoader() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (activeStep < steps.length - 2) {
      // Stop before the last element
      const interval = setInterval(() => {
        setActiveStep((prevStep) => prevStep + 1);
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [activeStep]);

  const steps = [
    'Finishing up interview',
    'Uploading interview data',
    'Analysing resume',
    'Setting up profile',
    'Redirecting to dashboard..',
  ];

  const yOffset = activeStep * -40;
  const nextStep = (activeStep + 1) % steps.length;
  const isRemainingStep = (index: number) =>
    index > nextStep ||
    (nextStep < activeStep && index > nextStep && index < activeStep);

  return (
    <div className='flex h-[100vh] w-[100vw] items-center justify-center'>
      <div className='relative flex h-[400px] w-[240px] items-center justify-center overflow-hidden'>
        <div className='absolute left-0 top-0 z-20 h-[160px] w-full bg-gradient-to-b from-white to-transparent'></div>
        <div className='absolute bottom-0 left-0 z-20 h-[310px] w-full bg-gradient-to-t from-white to-transparent'></div>
        <div
          className='absolute scale-y-0  left-0 top-0 z-10 flex h-full w-full flex-col items-start justify-center gap-2 transition-transform duration-500'
          style={{ transform: `translateY(${yOffset}px)` }}
        >
          {steps.map((text, index) => (
            <div key={index} className='flex h-[40] items-center gap-2'>
              <div
                className={`relative h-8 w-8 transition-all duration-500 ${
                  index <= activeStep
                    ? 'text-green-600'
                    : index === nextStep
                      ? 'text-blue-600'
                      : 'text-gray-500'
                }`}
              >
                <Circle
                  className={`absolute left-0 top-0 transition-opacity duration-500 ${
                    isRemainingStep(index) ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <CheckCircle2
                  className={`absolute left-0 top-0 transition-opacity duration-500 ${
                    index <= activeStep ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <LoaderCircle
                  className={`absolute left-0 top-0 animate-spin transition-opacity duration-500 ${
                    index === nextStep ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>

              {/* Text Logic */}
              <div
                className={`h-[30px] transition-colors duration-500 ${
                  index <= activeStep
                    ? 'text-green-700'
                    : index === nextStep
                      ? 'text-blue-600'
                      : isRemainingStep(index)
                        ? 'text-gray-500'
                        : 'text-gray-400'
                }`}
              >
                {text}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MultiStepLoader;
