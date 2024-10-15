import { api } from "trpc/client";

export const useAuth = () => {
  return api.user.auth.useQuery();
};
