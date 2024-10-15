import { createTRPCRouter } from "../../trpc";
import { campaignCheck } from "./check";

export const campaign = createTRPCRouter({
  check: campaignCheck,
});
