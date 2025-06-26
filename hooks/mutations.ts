import { useMutation, useQueryClient } from "@tanstack/react-query";

import { patch, post } from "@/lib/api";
import { Site, User } from "@/db/schema";
import { APIResponse } from "@/types";
import { CreateSiteInput, UserInput } from "@/lib/schemas";
import { handleAPIError } from "@/lib/utils";

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

export function useCreateSite() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (values: CreateSiteInput) => {
      try {
        const response = await post<CreateSiteInput, APIResponse<{ site: Site }>>("/sites", values);
        return response?.data;
      } catch (error) {
        return handleAPIError(error);
      }
    },
    onSuccess(data) {
      if (data && "data" in data) {
        queryClient.setQueryData(["sites"], data);
      } else {
        queryClient.invalidateQueries({ queryKey: ["sites"] });
      }
    },
  });
}
