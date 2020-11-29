import { AxiosResponse } from 'axios';

export interface ResponseData<T> {
  isLoading: boolean;
  isError: boolean;
  data?: T;
}

export interface RequestArgs<T = any, R = any> {
  request: (data?: T, authToken?: string) => Promise<AxiosResponse<R>>;
  initialData?: R;
  initialParams?: RequestParams<T>;
}

export type RequestParams<T = any> = {
  data?: T;
  authToken?: string;
};

export type Refetch<T> = (params: RequestParams<T>) => void;
