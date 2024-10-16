import type { PATHS } from './allPaths';

export type Pages<
  T extends {
    [_id in (typeof PATHS)[number]]?: Record<string, unknown>;
  },
> = T;
