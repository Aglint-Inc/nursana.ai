'use client';

import { TvMinimalPlay } from 'lucide-react';
import { ErrorBoundary } from 'react-error-boundary';

import Pill from '@/authenticated/components/Pill';
import { RadarChartInterviewVideo } from '@/authenticated/components/RadarChartInterviewVideo';
import { RatingBar } from '@/authenticated/components/RatingBar';
import { ScrollArea } from '@/components/ui/scroll-area';
import NotAvailable from '@/dashboard/components/NotAvailable';
import { useInterviewAnalysis } from '@/interview/hooks/useInterviewAnalysis';

export const VideoAudioAnalysis = () => {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Content />
    </ErrorBoundary>
  );
};

const Content = () => {
  const analysis = useInterviewAnalysis();

  if (!analysis.video_analysis) return <ErrorFallback />;
  const audio_analysis = analysis.video_analysis.audio_analysis;
  const behavioral_traits = analysis.video_analysis.behavioral_traits;
  const body_language = analysis.video_analysis.body_language;

  const clarity_score = analysis.video_analysis.clarity_score;
  const stress_level = analysis.video_analysis.stress_level;
  const empathy_score = analysis.video_analysis.empathy_score;
  const professionalism = analysis.video_analysis.professionalism;
  const confidence = analysis.video_analysis.confidence;
  const sentiment = analysis.video_analysis.sentiment;

  return (
    <ScrollArea className='max-h-[100vh] min-h-[800px]'>
      <div className='mx-auto max-w-4xl p-0 lg:container max-lg:py-5 lg:py-10'>
        <div className='text-md mb-3 font-medium lg:mb-6 lg:text-xl'>
          Analysis ( Video - Audio )
        </div>
        <div className='mb-20 flex flex-col gap-8'>
          <RadarChartInterviewVideo analysis={analysis.video_analysis} />
          <div className='flex flex-col gap-8'>
            {empathy_score && (
              <RatingBar
                label='Empathy'
                score={empathy_score.value}
                explanation={empathy_score.reason}
                maxValue={10}
              />
            )}
            {sentiment && (
              <RatingBar
                label='Sentiment'
                score={sentiment.confidence}
                explanation={sentiment.reason}
                maxValue={10}
              />
            )}

            {stress_level && (
              <RatingBar
                label='Stress level'
                score={stress_level.confidence}
                explanation={stress_level.reason}
                maxValue={10}
              />
            )}

            <div className='flex flex-col gap-1'>
              <div className='flex flex-col gap-2'>
                <span className='text-md font-medium lg:text-lg'>
                  Body Language
                </span>
                <div className='flex flex-row gap-8'>
                  {body_language.eye_contact && (
                    <div className='flex- row flex items-center gap-2 space-x-2'>
                      Eye contact -
                      <span className='text-xs text-muted-foreground'>
                        <Pill
                          text={body_language.eye_contact}
                          level={
                            body_language.eye_contact === 'consistent'
                              ? 'high'
                              : 'low'
                          }
                        />
                      </span>
                    </div>
                  )}
                  {body_language.gesture_use && (
                    <div className='flex- row flex items-center gap-2 space-x-2'>
                      Gesture Use -
                      <span className='text-xs text-muted-foreground'>
                        <Pill text={body_language.gesture_use} level='medium' />
                      </span>
                    </div>
                  )}
                  {body_language.smiling && (
                    <div className='flex- row flex items-center gap-2 space-x-2'>
                      Smiling -
                      <span className='text-xs text-muted-foreground'>
                        <Pill text={body_language.smiling} level='neutral' />
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <p className='text-muted-foreground'>{body_language.reason}</p>
            </div>

            {confidence && (
              <RatingBar
                label='Confidence'
                score={confidence.value}
                explanation={confidence.reason}
                maxValue={10}
              />
            )}

            <div className='flex flex-col gap-1'>
              <div className='flex flex-col gap-2'>
                <span className='text-md font-medium lg:text-lg'>
                  Audio analysis
                </span>
                <div className='flex flex-row gap-8'>
                  {audio_analysis.pauses && (
                    <div className='flex- row flex items-center gap-2 space-x-2'>
                      Pauses -
                      <span className='text-xs text-muted-foreground'>
                        <Pill
                          text={audio_analysis.pauses}
                          level={
                            audio_analysis.pauses === 'minimal' ? 'high' : 'low'
                          }
                        />
                      </span>
                    </div>
                  )}
                  {audio_analysis.tone && (
                    <div className='flex- row flex items-center gap-2 space-x-2'>
                      Tone -
                      <span className='text-xs text-muted-foreground'>
                        <Pill
                          text={audio_analysis.pauses}
                          level={
                            audio_analysis.tone === 'calm' ? 'high' : 'low'
                          }
                        />
                      </span>
                    </div>
                  )}
                  {audio_analysis.speech_speed && (
                    <div className='flex- row flex items-center gap-2 space-x-2'>
                      Speech speed -
                      <span className='text-xs text-muted-foreground'>
                        <Pill
                          text={audio_analysis.speech_speed}
                          level='neutral'
                        />
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <p className='text-muted-foreground'>{audio_analysis.reason}</p>
            </div>

            {clarity_score && (
              <RatingBar
                label='Clarity'
                score={clarity_score.value}
                explanation={clarity_score.reason}
                maxValue={10}
              />
            )}
            {professionalism && (
              <RatingBar
                label='Professionalism'
                score={professionalism.value}
                explanation={professionalism.reason}
                maxValue={10}
              />
            )}

            <div className='flex flex-col gap-1'>
              <div className='flex flex-col gap-2'>
                <span className='text-md font-medium lg:text-lg'>
                  Behavioral traits
                </span>
                <div className='flex flex-row gap-2'>
                  {behavioral_traits.traits.map((text) => (
                    <Pill key={text} text={text} level={'neutral'} />
                  ))}
                </div>
              </div>

              <p className='text-muted-foreground'>
                {behavioral_traits.reason}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

const ErrorFallback = () => {
  return (
    <NotAvailable
      heading='Video Analysis not yet done'
      description=''
      Icon={TvMinimalPlay}
      actionBtn={<></>}
    />
  );
};
