import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  CreateCaffResp,
  IDeleteCaffResp,
  IDetailsCaffResp,
  IUpdateCaffReq,
  UpdateCaffResp,
  IDetailsAllCaffResp,
} from '../swagger';
import { Image } from './types';

type CreateCaffQuery = (data?: FormData, authToken?: string) => Promise<AxiosResponse<CreateCaffResp>>;
type AnimationsListQuery = () => Promise<AxiosResponse<IDetailsAllCaffResp>>;
type PreviewQuery = (data?: { id: number }) => Promise<AxiosResponse<Image>>;

type UpdateCaffQuery = (data?: IUpdateCaffReq, authToken?: string) => Promise<AxiosResponse<UpdateCaffResp>>;

type GetCaffQuery = (data?: number, authToken?: string) => Promise<AxiosResponse<IDetailsCaffResp>>;

type DeleteCaffQuery = (data?: number, authToken?: string) => Promise<AxiosResponse<IDeleteCaffResp>>;

export type CaffClient = {
  create: CreateCaffQuery;
  details: GetCaffQuery;
  update: UpdateCaffQuery;
  deleteCaff: DeleteCaffQuery;
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
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  };

  const details: GetCaffQuery = (data, authToken) => {
    return axios.get<CreateCaffResp>(`/details?id=${data}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  };

  const update: UpdateCaffQuery = (data, authToken) => {
    return axios.post<UpdateCaffResp>('/update', data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  };

  const deleteCaff: DeleteCaffQuery = (data, authToken) => {
    return axios.post<IDeleteCaffResp>('/delete', data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
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
    details,
    update,
    deleteCaff,
    animationsList,
    getPreview,
  };
}
