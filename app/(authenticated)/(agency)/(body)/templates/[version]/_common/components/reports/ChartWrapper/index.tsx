import { Loader2 } from 'lucide-react';
import React from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ChartWrapperProps {
  isLoading?: boolean;
  error?: string;
  isEmpty?: boolean;
  children: React.ReactNode;
}

export default function ChartWrapper({
  isLoading = false,
  error,
  isEmpty = false,
  children,
}: ChartWrapperProps) {
  const isError = !!error;
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className='flex flex-col items-center justify-center'>
          <Loader2 className='h-8 w-8 animate-spin text-primary' />
        </div>
      );
    }

    if (isError) {
      return (
        <Alert
          variant='destructive'
          className='flex flex-col justify-center border-none p-0'
        >
          <AlertTitle>Error</AlertTitle>
          <AlertDescription className='text-xs'>{error}</AlertDescription>
        </Alert>
      );
    }

    if (isEmpty) {
      return (
        <Alert className='flex flex-col justify-center border-none p-0'>
          <AlertTitle>No Data</AlertTitle>
          <AlertDescription className='text-xs'>
            There is no data available for this chart.
          </AlertDescription>
        </Alert>
      );
    }

    return children;
  };

  return renderContent();
}
