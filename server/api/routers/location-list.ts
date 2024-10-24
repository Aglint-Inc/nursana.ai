import 'server-only';

import {
    privateProcedure
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const query = async () => {
  const supabase = createPrivateClient();
  const { data } = await supabase.from('locations_list').select();

  return { locationList: data ?? [] };
};

export const getLocationList = privateProcedure.query(query);
