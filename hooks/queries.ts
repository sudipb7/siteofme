import { useQuery } from "@tanstack/react-query";

import { get } from "@/lib/api";
import { User } from "@/db/schema";
import { APIResponse } from "@/types";
import { handleAPIError } from "@/lib/utils";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const response = await get<APIResponse<{ user: User }>>("/users/current");
        return response?.data;
      } catch (error) {
        handleAPIError(error);
      }
    },
  });
}
