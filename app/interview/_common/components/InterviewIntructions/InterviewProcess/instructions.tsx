import { CheckCircle, Clock, Mic, Sun, Video } from 'lucide-react';
import { usePostHog } from 'posthog-js/react';

import NursanaLogo from '@/components/nursana-logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Instructions({ onProceed }: { onProceed: () => void }) {
  const posthog = usePostHog();
  return (
    <div className='flex h-screen flex-col items-center justify-center gap-8'>
      <NursanaLogo />
      <div className='mx-auto max-w-md space-y-6'>
        <Card className='border-none bg-white/80 shadow-lg backdrop-blur-md'>
          <CardHeader>
            <CardTitle className='bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-center text-2xl font-bold text-transparent'>
              Ready for Your Interview
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-6'>
            <div className='grid gap-4'>
              <div className='flex items-start gap-4 rounded-lg bg-white/50 p-4'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-purple-100'>
                  <Video className='h-5 w-5 text-purple-600' />
                </div>
                <div>
                  <h3 className='font-semibold'>Check your camera</h3>
                  <p className='text-sm text-gray-600'>
                    Ensure your camera is working and well-positioned
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-4 rounded-lg bg-white/50 p-4'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-purple-100'>
                  <Mic className='h-5 w-5 text-purple-600' />
                </div>
                <div>
                  <h3 className='font-semibold'>Test your microphone</h3>
                  <p className='text-sm text-gray-600'>
                    Make sure your microphone is working properly
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-4 rounded-lg bg-white/50 p-4'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-purple-100'>
                  <Sun className='h-5 w-5 text-purple-600' />
                </div>
                <div>
                  <h3 className='font-semibold'>
                    Find a quiet, well-lit space
                  </h3>
                  <p className='text-sm text-gray-600'>
                    Choose a location with minimal background noise
                  </p>
                </div>
              </div>

              <div className='flex items-start gap-4 rounded-lg bg-white/50 p-4'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-purple-100'>
                  <Clock className='h-5 w-5 text-purple-600' />
                </div>
                <div>
                  <h3 className='font-semibold'>10-minute duration</h3>
                  <p className='text-sm text-gray-600'>
                    The interview will take approximately 10 minutes
                  </p>
                </div>
              </div>
            </div>

            <Button
              className={PurpleButtonClassName}
              onClick={() => {
                posthog.capture('interview-proceed-clicked');
                onProceed();
              }}
            >
              Proceed to Interview
              <CheckCircle className='ml-2 h-4 w-4' />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export const PurpleButtonClassName =
  'w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700';
