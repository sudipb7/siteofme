import { useMutation, useQueryClient } from "@tanstack/react-query";

import { patch } from "@/lib/api";
import type { User } from "@/db/schema";
import type { APIResponse } from "@/types";
import { handleAPIError } from "@/lib/utils";
import type { UserInput } from "@/lib/schemas";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, values }: { id: string; values: UserInput }) => {
      try {
        const response = await patch<UserInput, APIResponse<{ user: User }>>(
          `/users/${id}`,
          values
        );
        return response?.data;
      } catch (error) {
        return handleAPIError(error);
      }
    },
    onSuccess(data) {
      if (data && "data" in data) {
        queryClient.setQueryData(["users"], data);
      } else {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
  });
}
