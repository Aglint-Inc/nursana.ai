import { createTRPCRouter } from '../../trpc';
import { userCheck } from './check';
import { createUser } from './create';
import { createInterview } from './create_interview';
import { getData } from './get_data';
import { updateUser } from './update';
import { updatePreferences } from './update_preferences';

export const user = createTRPCRouter({
  create_interview: createInterview,
  check: userCheck,
  create: createUser,
  get_data: getData,
  updatePreferences: updatePreferences,
  updateUser,
});
