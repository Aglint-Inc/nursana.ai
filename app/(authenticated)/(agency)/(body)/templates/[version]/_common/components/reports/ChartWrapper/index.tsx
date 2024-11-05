import { Loader2 } from 'lucide-react';
import React, { type ReactNode } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface ChartWrapperProps {
  header: ReactNode;
  isLoading?: boolean;
  error?: string;
  isEmpty?: boolean;
  children: React.ReactNode;
  height?: string;
  paddingOverRider?: string;
}

export default function ChartWrapper({
  header,
  isLoading = false,
  error,
  isEmpty = false,
  children,
  height = '60px',
  paddingOverRider,
}: ChartWrapperProps) {
  const isError = !!error;
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className='flex h-full flex-col items-center justify-center'>
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
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <>{header}</>
      </CardHeader>
      <CardContent className={`h-[${height}] ${paddingOverRider || ''}`}>
        {renderContent()}
      </CardContent>
    </Card>
  );
}
