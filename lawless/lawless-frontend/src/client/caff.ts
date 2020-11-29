import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { CreateCaffResp, IDetailsAllCaffResp } from '../swagger';
import { EmptyReq } from './types';

type CreateCaffQuery = (data?: FormData, authToken?: string) => Promise<AxiosResponse<CreateCaffResp>>;
type AnimationsListQuery = (data?: EmptyReq, authToken?: string) => Promise<AxiosResponse<IDetailsAllCaffResp>>;

export type CaffClient = {
  create: CreateCaffQuery;
  animationsList: AnimationsListQuery;
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

  const animationsList: AnimationsListQuery = (
    _data?: undefined,
    authToken?: string,
  ): Promise<AxiosResponse<IDetailsAllCaffResp>> => {
    return axios.get<IDetailsAllCaffResp>('/detailsAll', {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  };

  return {
    create,
    animationsList,
  };
}
