import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { CreateCaffResp } from '../swagger';

type CreateCaffQuery = (data?: FormData, authToken?: string) => Promise<AxiosResponse<CreateCaffResp>>;

export type CaffClient = {
  create: CreateCaffQuery;
};

export function caff(config: AxiosRequestConfig): CaffClient {
  const axios = Axios.create({
    ...config,
    baseURL: `${config.baseURL}/api/caff`,
  });

  const create: CreateCaffQuery = (data, authToken) => {
    return axios.post<CreateCaffResp>('/create', data, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  };

  return {
    create,
  };
}
