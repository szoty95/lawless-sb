import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { CreateCaffResp, IDetailsAllCaffResp } from '../swagger';
import { Image } from './types';

type CreateCaffQuery = (data?: FormData, authToken?: string) => Promise<AxiosResponse<CreateCaffResp>>;
type AnimationsListQuery = () => Promise<AxiosResponse<IDetailsAllCaffResp>>;
type PreviewQuery = (data?: { id: number }) => Promise<AxiosResponse<Image>>;

export type CaffClient = {
  create: CreateCaffQuery;
  animationsList: AnimationsListQuery;
  getPreview: PreviewQuery;
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

  const animationsList: AnimationsListQuery = (): Promise<AxiosResponse<IDetailsAllCaffResp>> => {
    return axios.get<IDetailsAllCaffResp>('/detailsAll');
  };

  const getPreview: PreviewQuery = (data): Promise<AxiosResponse<Image>> => {
    return axios.get<Image>(`/picture?id=${data?.id}`);
  };

  return {
    create,
    animationsList,
    getPreview,
  };
}
