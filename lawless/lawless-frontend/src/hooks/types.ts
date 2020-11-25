export interface ResponseData<T> {
  isLoading: boolean;
  isError: boolean;
  data?: T;
}

export interface RequestArgs<T = any, R = any> {
  request: (body: RequestParams<T>) => Promise<R> | undefined;
  initialData?: R | undefined;
  initialParams?: RequestParams<T>;
}

export type RequestParams<T = any> = T | null | undefined;

export type Refetch<T> = (params?: RequestParams<T>) => void;
