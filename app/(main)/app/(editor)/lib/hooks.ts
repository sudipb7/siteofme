import { useMutation } from "@tanstack/react-query";

import { post } from "@/lib/api";
import { handleAPIError } from "@/lib/utils";
import type { Site, SiteInsert } from "@/db/schema";
import type { APIResponse, BaseAPIResponse } from "@/types";

export function useResendVerificationMail() {
  return useMutation({
    mutationFn: async () => {
      try {
        const res = await post<Record<string, never>, BaseAPIResponse>(
          "/auth/resend-verification",
          {}
        );
        return res?.data;
      } catch (error) {
        return handleAPIError(error);
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
