import axios, { AxiosRequestConfig } from "axios";

export const getInstance = async () => {
  const instance = axios.create({
    baseURL: "/api",
  });
  return instance;
};

export const post = async <RequestType, ResponseType>(
  url: string,
  data: RequestType,
  options?: AxiosRequestConfig
) => {
  const instance = await getInstance();
  const response = await instance.post<ResponseType>(url, data, {
    ...options,
  });
  return response;
};

export const get = async <ResponseType>(url: string, options?: AxiosRequestConfig) => {
  const instance = await getInstance();
  const response = await instance.get<ResponseType>(url, { ...options });
  return response;
};

export const patch = async <RequestType, ResponseType>(
  url: string,
  data: RequestType,
  options?: AxiosRequestConfig
) => {
  const instance = await getInstance();
  const response = await instance.patch<ResponseType>(url, data, {
    ...options,
  });
  return response;
};

export const remove = async <ResponseType>(url: string, options?: AxiosRequestConfig) => {
  const instance = await getInstance();
  const response = await instance.delete<ResponseType>(url, {
    ...options,
  });
  return response;
};
