/* eslint-disable security/detect-non-literal-regexp */
import { PATHS } from '@/interview/constants/paths';

const BASE_PATH = '^/interviews/.+?';

export const getInterviewCatchAllPath = (path: string) =>
  PATHS.filter((path) => path !== 'overview').find((p) =>
    new RegExp(`${BASE_PATH}/${p}$`).test(path),
  ) ?? null;
