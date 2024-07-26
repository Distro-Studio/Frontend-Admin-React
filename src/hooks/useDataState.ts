import { useEffect, useRef, useState } from "react";
import useDebugLoadingState from "../global/useDebugLoadingState";
import useDebugErrorState from "../global/useDebugErrorState";
import useDebugNoDataState from "../global/useDebugNoDataState";

interface Props<T> {
  initialData?: T;
  url?: string;
  payload?: any;
  limit?: number;
  dependencies?: any[];
  conditions?: boolean;
}

const useDataState = <T>({
  initialData,
  payload,
  url,
  limit = 10,
  dependencies = [],
  conditions = true,
}: Props<T>) => {
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingLoadMore, setLoadingLoadMore] = useState<boolean>(false);
  const [data, setData] = useState<T | undefined>(initialData);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    if (conditions && url) {
      getData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conditions, url, ...dependencies]);

  function getData() {
    const options = {
      method: payload ? "POST" : "GET",
      url: url,
      headers: {
        "Content-Type": "application/json",
        //TODO auth token
        Authorization: "Bearer ACCESS_TOKEN",
      },
      payload: {
        ...payload,
        limit: limit,
        offset: offset,
      },
    };

    console.log(options);

    // TODO http get the URL here with axios or something you like
    // axios
    //   .post(url)
    //   .then((r) => {
    //     setError(false);
    //     if (r.status === 200) {
    //       setData(r.data.data);
    //     }
    //   })
    //   .catch((e) => {
    //     setError(true);
    //     console.log(e);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  }

  function retry() {
    //!DEBUG------------------------------------------------------------------------------
    setDebugErrorState(false);
    setDebugLoadingState(true);
    //!------------------------------------------------------------------------------DEBUG

    // setError(false);
    // setLoading(true);
    getData();
  }

  function loadMore() {
    setLoadingLoadMore(true);
    setOffset((ps) => ps + limit);
    //TODO http request dan append ke data
  }

  //!! DEBUG------------------------------------------------------------------------------
  const { debugErrorState, setDebugErrorState } = useDebugErrorState();
  const { debugLoadingState, setDebugLoadingState } = useDebugLoadingState();
  const { debugNoDataState } = useDebugNoDataState();
  const initialDataRef = useRef(initialData);

  useEffect(() => {
    setError(debugErrorState);
  }, [debugErrorState]);

  useEffect(() => {
    setLoading(debugLoadingState);
  }, [debugLoadingState]);

  useEffect(() => {
    if (debugNoDataState) {
      setData(undefined);
    } else {
      setData(initialDataRef.current);
    }
  }, [debugNoDataState]);
  //!!-------------------------------------------------------------------------------DEBUG

  return {
    data,
    setData,
    loading,
    setLoading,
    error,
    setError,
    retry,
    loadMore,
    loadingLoadMore,
    setLoadingLoadMore,
  };
};

export default useDataState;
