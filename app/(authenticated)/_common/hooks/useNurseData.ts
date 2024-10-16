import { api } from "trpc/client";

export const useNurseData = () => {
  return api.user.get_data.useQuery();
};
