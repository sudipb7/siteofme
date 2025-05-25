import { User } from "@/db/schema";
import { get } from "@/lib/api";
import { handleAPIError } from "@/lib/utils";
import { APIResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

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
