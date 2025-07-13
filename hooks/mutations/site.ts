import { Site, SiteInsert } from "@/db/schema";
import { post } from "@/lib/api";
import { CreateSiteInput } from "@/lib/schemas";
import { handleAPIError } from "@/lib/utils";
import { APIResponse } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

export function usePublishSite() {
  return useMutation({
    mutationFn: async (values: SiteInsert) => {
      try {
        const res = await post<SiteInsert, APIResponse<Site>>("/sites/publish", values);
        return res?.data as APIResponse<Site>;
      } catch (error) {
        return handleAPIError(error);
      }
    },
  });
}
