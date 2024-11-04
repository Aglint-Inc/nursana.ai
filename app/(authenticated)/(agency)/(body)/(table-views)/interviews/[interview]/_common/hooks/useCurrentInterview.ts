import { useParams } from 'next/navigation';

import type { PageProps } from '../types';

export const useCurrentInterview = () => useParams() as PageProps['params'];
