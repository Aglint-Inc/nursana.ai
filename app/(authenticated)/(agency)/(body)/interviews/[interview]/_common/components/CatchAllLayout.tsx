import { unstable_noStore } from 'next/cache';
import type { PropsWithChildren } from 'react';
import { api, HydrateClient } from 'trpc/server';

import type { PageProps } from '@/interview/types';
import { getInterviewCatchAllPath } from '@/interview/utils/getInterviewCatchAllPath';

export const CatchAllLayout = (props: PropsWithChildren<PageProps>) => {
  unstable_noStore();

  const path = getInterviewCatchAllPath(props.params.all[0]);

  switch (path) {
    case 'resume':
      {
        void api.authenticated.agency.interviews.interview.read.prefetch({
          id: props.params.interview,
        });
        void api.authenticated.agency.interviews.interview.resume.prefetch({
          id: props.params.interview,
        });
        void api.authenticated.agency.interviews.interview.resumeUrl.prefetch({
          id: props.params.interview,
        });
      }
      break;
    case 'feedback':
      {
        void api.authenticated.agency.interviews.interview.read.prefetch({
          id: props.params.interview,
        });
        void api.authenticated.agency.interviews.interview.analysis.prefetch({
          id: props.params.interview,
        });
      }
      break;
    case 'transcript':
      {
        void api.authenticated.agency.interviews.interview.audio.prefetch({
          id: props.params.interview,
        });
        void api.authenticated.agency.interviews.interview.video.prefetch({
          id: props.params.interview,
        });
        void api.authenticated.agency.interviews.interview.read.prefetch({
          id: props.params.interview,
        });
        void api.authenticated.agency.interviews.interview.analysis.prefetch({
          id: props.params.interview,
        });
      }
      break;
  }
  return <HydrateClient>{props.children}</HydrateClient>;
};
