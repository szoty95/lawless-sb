export interface ResponseData<T> {
  isLoading: boolean;
  isError: boolean;
  data?: T;
}

export interface RequestArgs<T = any, R = any> {
  request: (params: RequestParams<T>) => Promise<ResponseData<R>> | undefined;
  initialData?: R;
  initialParams?: RequestParams<T>;
}

export type RequestParams<T = any> = T | null | undefined;

export type Refetch = (params?: RequestParams) => void;
