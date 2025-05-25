export type BaseAPIResponse = { error: string } | { message: string };

export type APIResponse<T> = { error: string } | { message: string; data: T };
