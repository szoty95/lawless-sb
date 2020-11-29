import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import {
  CreateCaffResp,
  IDeleteCaffReq,
  IDeleteCaffResp,
  IDetailsCaffResp,
  UpdateCaffResp,
} from "../swagger";

type CreateCaffQuery = (
  data?: FormData,
  authToken?: string
) => Promise<AxiosResponse<CreateCaffResp>>;

export type IUpdateCaffReq = {
  name?: string;
  price?: string;
  description?: string;
};

type UpdateCaffQuery = (
  data?: IUpdateCaffReq,
  authToken?: string
) => Promise<AxiosResponse<UpdateCaffResp>>;

type GetCaffQuery = (
  data?: number,
  authToken?: string
) => Promise<AxiosResponse<IDetailsCaffResp>>;

type DeleteCaffQuery = (
  data?: IDeleteCaffReq,
  authToken?: string
) => Promise<AxiosResponse<IDeleteCaffResp>>;

export type CaffClient = {
  create: CreateCaffQuery;
  details: GetCaffQuery;
  update: UpdateCaffQuery;
  deleteCaff: DeleteCaffQuery;
};

export function caff(config: AxiosRequestConfig): CaffClient {
  const axios = Axios.create({
    ...config,
    baseURL: config.baseURL + "/api/caff",
  });

  const create: CreateCaffQuery = (data, authToken) => {
    return axios.post<CreateCaffResp>("/create", data, {
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
    return axios.post<UpdateCaffResp>("/update", data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  };

  const deleteCaff: DeleteCaffQuery = (data, authToken) => {
    return axios.post<IDeleteCaffResp>("/delete", data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  };

  return {
    create,
    details,
    update,
    deleteCaff,
  };
}
