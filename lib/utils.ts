import { ZodError } from "zod";
import { isAxiosError } from "axios";
import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

import type { BaseAPIResponse } from "@/types";

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
