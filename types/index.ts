import { SITE_CONFIG } from "@/lib/constants";

export type BaseAPIResponse = { error: string } | { message: string };

export type APIResponse<T> = { error: string } | { message: string; data: T };

export type SiteConfig = typeof SITE_CONFIG;
