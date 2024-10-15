import { createTRPCRouter } from "../../trpc";
import { userCheck } from "./check";
import { createUser } from "./create";
import { createInterview } from "./create_interview";

export const user = createTRPCRouter({
  create_interview: createInterview,
  check: userCheck,
  create: createUser,
});
