import { useMutation } from "@tanstack/react-query";

import { post } from "@/lib/api";
import { handleAPIError } from "@/lib/utils";
import type { BaseAPIResponse } from "@/types";

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
