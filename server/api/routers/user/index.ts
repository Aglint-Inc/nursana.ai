import 'server-only';

import { createTRPCRouter } from '../../trpc';
import { userCheck } from './check';
import { createUser } from './create';
import { createPreferredJobTitles } from './create/prefeerred-job-titles';
import { createPreferredJobLocations } from './create/preferred-job-locations';
import { createPreferredJobTypes } from './create/preferred-job-types';
import { createInterview } from './create_interview';
import { deletePreferredJobLocations } from './delete/delete-prefeerred-job-locations';
import { deletePreferredJobTitles } from './delete/delete-prefeerred-job-titles';
import { deletePreferredJobTypes } from './delete/delete-prefeerred-job-types';
import { getData } from './get_data';
import { getPreferredJobLocations } from './get_data/get-preferred-job-locations';
import { getPreferredJobTitles } from './get_data/get-preferred-job-titles';
import { getPreferredJobTypes } from './get_data/get-preferred-job-types';
import { updateUser } from './update';
import { updatePreferences } from './update_preferences';

export const user = createTRPCRouter({
  create_interview: createInterview,
  check: userCheck,

  create: createUser,
  createPreferredJobTitles,
  createPreferredJobLocations,
  createPreferredJobTypes,

  get_data: getData,
  getPreferredJobTypes,
  getPreferredJobTitles,
  getPreferredJobLocations,

  deletePreferredJobTitles,
  deletePreferredJobTypes,
  deletePreferredJobLocations,

  updatePreferences: updatePreferences,
  updateUser,
});
