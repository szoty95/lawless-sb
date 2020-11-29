import { useCallback, useEffect, useState } from 'react';
import { Refetch, RequestArgs, RequestParams, ResponseData } from './types';

function useRequest<T = any, R = any>({ request }: RequestArgs<T, R>): [ResponseData<R>, Refetch<T>] {
  const [data, setData] = useState<R | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [requestParams, setRequestParams] = useState<RequestParams<T> | undefined>(undefined);

  const refetch = useCallback((newParams?) => {
    setRequestParams(newParams ?? {});
    setFetching(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await request(requestParams?.data, requestParams?.authToken);

        if (result) {
          setData(result.data);
        }
      } catch (error) {
        setIsError(true);
      }
      setFetching(false);
      setIsLoading(false);
    };

    if (fetching && !isLoading) {
      fetchData();
    }
  }, [request, fetching, isLoading, requestParams]);

  return [{ data, isLoading, isError }, refetch];
}

export default useRequest;
