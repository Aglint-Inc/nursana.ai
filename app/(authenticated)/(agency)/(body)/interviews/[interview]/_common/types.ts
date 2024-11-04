import type { PATHS } from './constants/paths';

export type PageProps = {
  params: {
    interview: string;
    all: [Exclude<(typeof PATHS)[number], 'overview'>];
  };
};
