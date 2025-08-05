import { apiURL } from "@/constants/url";

export const apiClient = async (url: string, options: RequestInit) => {
  const response = await fetch(`${apiURL}${url}`, {
    ...options,
    credentials: options.credentials || "include",
  });
  return response;
};
