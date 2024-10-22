import { Sparkles } from 'lucide-react';
import React from 'react';

interface ProgressBarCardProps {
  children: React.ReactNode;
  color?: 'purple' | 'pink'; 
  summary: string; 
}

const ProgressBarCard: React.FC<ProgressBarCardProps> = ({  children, color = 'purple', summary }) => {
  const bgColor = color === 'pink' ? 'bg-pink-50' : 'bg-purple-50';
  const textColor = color === 'pink' ? 'text-pink-600' : 'text-purple-600';

  return (
      <div className={`flex flex-col gap-2 rounded-lg ${bgColor} p-6`}>
        <div className='flex flex-col'>
          <div className='ml-[-32px] mt-[-32px] h-48 w-48'>
            {children}
          </div>
          <div className='mt-[-16px] flex items-center gap-2'>
            <Sparkles className={`${textColor} w-5 h-5`} strokeWidth={1.5}/>
            <h3 className={`text-lg font-medium ${textColor}`}>
              Summary
            </h3>
          </div>
        </div>
        <p className=' text-muted-foreground'>
        {summary}
      </p>
      </div>
      

  );
};

export default ProgressBarCard;
