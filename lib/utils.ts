import { ZodError } from "zod";
import { isAxiosError } from "axios";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

import type { BaseAPIResponse } from "@/types";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getZodError(error: ZodError) {
  return error.errors[0].message;
}

export function handleAPIError(error: unknown) {
  if (isAxiosError(error)) {
    return error.response?.data as BaseAPIResponse;
  } else if (error instanceof Error) {
    return { error: error.message } as BaseAPIResponse;
  } else {
    return { error: "Something went wrong :(" } as BaseAPIResponse;
  }
}

export function handleClientError(error: unknown) {
  const apiError = handleAPIError(error);
  const errorMessage = "error" in apiError ? apiError.error : "Something went wrong :(";
  toast.error(errorMessage);
}

export function getSearchParams(url: string) {
  const params = {} as Record<string, string>;

  new URL(url).searchParams.forEach(function (val, key) {
    params[key] = val;
  });

  return params;
}