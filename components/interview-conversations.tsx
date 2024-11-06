'use client';
import { Sparkle, User } from 'lucide-react';
import React from 'react';

function InterviewConversations({
  showCaptions,
  isInterviewStarted,
  isProcessing,
  conversationHistory,
}: {
  showCaptions: boolean;
  isInterviewStarted: boolean;
  isProcessing: boolean;
  conversationHistory: { role: 'ai' | 'human'; content: string }[];
}) {
  return (
    <>
      {showCaptions && isInterviewStarted && !isProcessing && (
        <div className='text-md relative flex md:h-[30vh] h-[35vh] md:w-[700px] w-90vw flex-col justify-end gap-4 overflow-hidden rounded-lg bg-gray-50 p-6'>
          {conversationHistory.map((turn, index) => (
            <div
              key={index}
              className={`pb-2 ${
                turn.role === 'ai' ? 'text-black' : 'text-black'
              }`}
            >
              <p className='font-semibold'>
                {turn.role === 'ai' ? (
                  <>
                    <div className='mb-1 grid grid-cols-[max-content_1fr] items-center gap-2'>
                      <div className='flex h-6 w-6 items-center justify-center rounded-sm bg-gray-200 text-muted-foreground'>
                        <Sparkle className='' size={16} strokeWidth={1.2} />
                      </div>
                      <div className='text-sm font-normal'>AI Interviewer</div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className='mb-1 flex items-center gap-2'>
                      <div className='flex h-6 w-6 items-center justify-center rounded-sm bg-gray-200 font-medium text-muted-foreground'>
                        <User
                          className='text-muted-foreground'
                          size={16}
                          strokeWidth={1.2}
                        />
                      </div>
                      <div className='text-sm font-normal'>You</div>
                    </div>
                  </>
                )}
              </p>
              <p>{turn.content}</p>
            </div>
          ))}
          <div className='absolute left-0 top-0 z-10 h-[80%] w-full bg-gradient-to-b from-gray-50 to-transparent'></div>
        </div>
      )}
    </>
  );
}

export default InterviewConversations;
