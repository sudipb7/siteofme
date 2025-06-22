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

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: async (values: Pick<SignInInput, "email">) => {
      try {
        const response = await post<Pick<SignInInput, "email">, BaseAPIResponse>(
          "/auth/forgot-password",
          values
        );
        return response?.data;
      } catch (error) {
        return handleAPIError(error);
      }
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: async (values: Pick<SignInInput, "password"> & { token: string }) => {
      try {
        const response = await post<
          Pick<SignInInput, "password"> & { token: string },
          BaseAPIResponse
        >("/auth/reset-password", values);
        return response?.data;
      } catch (error) {
        return handleAPIError(error);
      }
    },
  });
};
