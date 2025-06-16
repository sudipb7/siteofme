import { useMutation } from "@tanstack/react-query";

import { post } from "@/lib/api";
import { BaseAPIResponse } from "@/types";
import { handleAPIError } from "@/lib/utils";
import type { SignInInput, SignUpInput } from "@/lib/schemas";

export const useSignUp = () => {
  return useMutation({
    mutationFn: async (values: SignUpInput) => {
      try {
        const response = await post<SignUpInput, BaseAPIResponse>("/auth/sign-up", values);
        return response?.data;
      } catch (error) {
        return handleAPIError(error);
      }
    },
  });
};

export const useSignIn = () => {
  return useMutation({
    mutationFn: async (values: SignInInput) => {
      try {
        const response = await post<SignInInput, BaseAPIResponse>("/auth/sign-in", values);
        return response?.data;
      } catch (error) {
        return handleAPIError(error);
      }
    },
  });
};
