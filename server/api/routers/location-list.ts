import 'server-only';

import { createPrivateClient } from '@/db/client';
import { privateProcedure } from '@/server/api/trpc';

const query = async () => {
  const supabase = createPrivateClient();
  const { data } = await supabase.from('locations_list').select();

  return { locationList: data ?? [] };
};

export const getLocationList = privateProcedure.query(query);
