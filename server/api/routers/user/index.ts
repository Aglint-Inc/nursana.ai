import { createTRPCRouter } from "../../trpc";
import { userCreate } from "./create";

export const user = createTRPCRouter({
  create: userCreate,
});
