import { type LucideProps } from 'lucide-react';
import React from 'react';

interface NotAvailableProps {
  heading: string;
  description: string;
  Icon: React.ComponentType<LucideProps>;
}

function NotAvailable({ heading, description, Icon }: NotAvailableProps) {
  return (
    <div className='flex h-full min-h-[400px] w-full flex-col items-center justify-center gap-4 text-center'>
      <Icon size={50} strokeWidth={1.3} className='text-purple-600' />
      <div className='flex flex-col items-center justify-center gap-1'>
        <div className='text-lg font-medium'>{heading}</div>
        <div className='text-md text-muted-foreground'>{description}</div>
      </div>
    </div>
  );
}

export default NotAvailable;
