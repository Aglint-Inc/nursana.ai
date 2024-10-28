import { type LucideProps } from 'lucide-react';
import React from 'react';

interface NotAvailableProps {
  heading: string;
  description: string;
  Icon: React.ComponentType<LucideProps>;
}

function EmptyState({ heading, description, Icon }: NotAvailableProps) {
  return (
    <div className='flex h-full min-h-[400px] w-full flex-col items-center justify-center gap-2 text-center'>
      <Icon size={24} strokeWidth={1.3} className='text-purple-600' />
      <div className='flex flex-col items-center justify-center gap-1'>
        <div className='text-md font-medium'>{heading}</div>
        <div className='text-sm text-muted-foreground'>{description}</div>
      </div>
    </div>
  );
}

export default EmptyState;
