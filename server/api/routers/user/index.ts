import { createTRPCRouter } from "../../trpc";
import { userCheck } from "./check";
import { createUser } from "./create";
import { createInterview } from "./create_interview";
import { getAuth } from "./get_auth";
import { getData } from "./get_data";

export const user = createTRPCRouter({
  create_interview: createInterview,
  check: userCheck,
  create: createUser,
  get_data: getData,
  auth: getAuth,
});