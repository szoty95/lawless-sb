import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { CreateCaffResp, IDetailsCaffResp } from "../swagger";

type CreateCaffQuery = (
  data?: FormData,
  authToken?: string
) => Promise<AxiosResponse<CreateCaffResp>>;

type GetCaffQuery = (
  data?: number,
  authToken?: string
) => Promise<AxiosResponse<IDetailsCaffResp>>;

export type CaffClient = {
  create: CreateCaffQuery;
  details: GetCaffQuery;
};

export function caff(config: AxiosRequestConfig): CaffClient {
  const axios = Axios.create({
    ...config,
    baseURL: config.baseURL + "/api/caff",
  });

  const create: CreateCaffQuery = (data, authToken) => {
    return axios.post<CreateCaffResp>("/create", data, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  };

  const details: GetCaffQuery = (data, authToken) => {
    return axios.get<CreateCaffResp>(`/details?detailsCaffRequest=${data}`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  };

  return {
    create,
    details,
  };
}
