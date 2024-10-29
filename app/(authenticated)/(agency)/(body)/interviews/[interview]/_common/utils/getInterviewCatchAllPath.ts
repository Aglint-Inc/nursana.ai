/* eslint-disable security/detect-non-literal-regexp */
import { PATHS } from '@/interview/constants/paths';
import { type PageProps } from '@/interview/types';

export const getInterviewCatchAllPath = (
  path: PageProps['params']['all'][number],
) =>
  PATHS.filter((path) => path !== 'overview').find((p) => p === path) ?? null;
