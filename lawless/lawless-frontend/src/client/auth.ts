import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { LoginReq, LoginResp, RegisterReq, RegisterResp, UserResp } from '../swagger';
import { EmptyReq } from './types';

type LoginQuery = (data?: LoginReq) => Promise<AxiosResponse<LoginResp>>;
type RegisterQuery = (data?: RegisterReq) => Promise<AxiosResponse<RegisterResp>>;
type MeQuery = (data?: EmptyReq, authToken?: string) => Promise<AxiosResponse<UserResp>>;

export type AuthClient = {
  login: LoginQuery;
  me: MeQuery;
  register: RegisterQuery;
};

export function auth(config: AxiosRequestConfig): AuthClient {
  const axios = Axios.create({
    ...config,
    baseURL: `${config.baseURL}/api/auth`,
  });

  const login: LoginQuery = (data?: LoginReq): Promise<AxiosResponse<LoginResp>> => {
    return axios.post<LoginResp>('/login', data);
  };

  const register: RegisterQuery = (data?: RegisterReq): Promise<AxiosResponse<RegisterResp>> => {
    return axios.post<RegisterResp>('/register', data);
  };

  const me: MeQuery = (data?: undefined, authToken?: string): Promise<AxiosResponse<UserResp>> => {
    return axios.get<UserResp>('/me', {
      headers: { Authorization: `Bearer ${authToken}` },
    });
  };

  return {
    login,
    register,
    me,
  };
}
