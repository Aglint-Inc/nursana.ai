import { type LucideProps } from 'lucide-react';
import React from 'react';

import { Loader } from '@/common/components/Loader';

interface NotAvailableProps {
  heading: string;
  description: string;
  Icon: React.ComponentType<LucideProps>;
  actionBtn?: React.ReactNode | null;
  loading?: boolean;
}

function NotAvailable({
  heading,
  description,
  Icon,
  actionBtn,
  loading,
}: NotAvailableProps) {
  return (
    <div className='flex h-full min-h-[400px] w-full flex-col items-center justify-center gap-4 text-center'>
      {loading ? (
        <Loader size={50} className='text-purple-600' />
      ) : (
        <Icon size={50} strokeWidth={1.3} className='text-purple-600' />
      )}
      <div className='flex flex-col items-center justify-center gap-1'>
        <div className='text-lg font-medium'>{heading}</div>
        <div className='text-sm text-muted-foreground'>{description}</div>
      </div>
      {actionBtn}
    </div>
  );
}

export default NotAvailable;
