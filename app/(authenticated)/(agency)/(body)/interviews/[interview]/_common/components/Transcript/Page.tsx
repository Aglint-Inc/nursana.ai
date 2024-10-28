'use client';

import { ErrorBoundary } from 'react-error-boundary';

import { Transcript } from './_common/components';

export const Page = () => {
  return (
    <ErrorBoundary fallback={<>Error</>}>
      <Transcript />
    </ErrorBoundary>
  );
};
