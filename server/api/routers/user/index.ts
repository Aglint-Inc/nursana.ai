import 'server-only';

import { createTRPCRouter } from '../../trpc';
import { userCheck } from './check';
import { createUser } from './create';
import { createInterview } from './create_interview';
import { getData } from './get_data';
import { updateUser } from './update';
import { updatePreferences } from './update_preferences';
import { createPreferredJobTitles } from './create/prefeerred-job-titles';
import { createPreferredJobTypes } from './create/preferred-job-types';
import { createPreferredJobLocations } from './create/preferred-job-locations';
import { getPreferredJobTypes } from './get_data/get-preferred-job-types';
import { getPreferredJobTitles } from './get_data/get-preferred-job-titles';
import { getPreferredJobLocations } from './get_data/get-preferred-job-locations';
import { deletePreferredJobTitles } from './delete/delete-prefeerred-job-titles';
import { deletePreferredJobTypes } from './delete/delete-prefeerred-job-types';
import { deletePreferredJobLocations } from './delete/delete-prefeerred-job-locations';

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
