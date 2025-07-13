import { useMutation, useQuery } from "@tanstack/react-query";

import { get, post } from "@/lib/api";
import type { User } from "@/db/schema";
import { handleAPIError } from "@/lib/utils";
import type { SignUpInput } from "@/lib/schemas";
import type { APIResponse, BaseAPIResponse } from "@/types";

export const useCheckUsername = () => {
  return useMutation({
    mutationKey: ["/check-username"],
    mutationFn: async (username: string) => {
      try {
        const response = await post<Pick<SignUpInput, "username">, BaseAPIResponse>(
          "/check-username",
          { username }
        );
        return response?.data as BaseAPIResponse;
      } catch (error) {
        return handleAPIError(error);
      }
    },
  });
};

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
