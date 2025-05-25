import { useMutation } from "@tanstack/react-query";

import { post } from "@/lib/api";
import { SignUpInput } from "@/lib/schemas";
import { handleAPIError } from "@/lib/utils";
import type { BaseAPIResponse } from "@/types";

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
