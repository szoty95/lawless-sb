import { AxiosRequestConfig } from "axios";
import { auth, AuthClient } from "./auth";

const DEFAULT_BASE_URL = "";

export function createClient(
  baseURL = DEFAULT_BASE_URL,
  configOverride?: AxiosRequestConfig
) {
  const config: AxiosRequestConfig = {
    baseURL,
    withCredentials: true,
    ...configOverride,
  };
  const client = {
    auth: auth(config),
  };
  return client;
}

export type Client = {
  auth: AuthClient;
};
