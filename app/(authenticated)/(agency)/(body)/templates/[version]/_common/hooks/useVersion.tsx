import { api } from 'trpc/client';

import { useVersionParams } from './useVersionParams';

export const useVersion = () => {
  const { version } = useVersionParams();
  return api.authenticated.agency.templates.version.read.useSuspenseQuery({
    version_id: version,
  })[0];
};
