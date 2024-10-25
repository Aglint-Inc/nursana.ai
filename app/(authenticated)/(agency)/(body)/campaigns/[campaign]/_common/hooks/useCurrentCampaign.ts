import { useParams } from 'next/navigation';

import { type PageProps } from '../types';

export const useCurrentCampaign = () => useParams() as PageProps['params'];
