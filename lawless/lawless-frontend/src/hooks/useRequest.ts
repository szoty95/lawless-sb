import { useCallback, useEffect, useState } from "react";
import { Refetch, RequestArgs, ResponseData } from "./types";

function useRequest<T = any, R = any>({
  request,
  initialData,
}: RequestArgs<T>): [ResponseData<R>, Refetch] {
  const [data, setData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [requestParams, setRequestParams] = useState({});

  const refetch = useCallback((newParams?) => {
    setRequestParams(newParams ?? {});
    setFetching(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);

      try {
        const result = await request(requestParams);

        setData(result.data);
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
