import { useEffect, useState } from "react";
import { AxiosPromise } from "axios";

export function useFetch<T>(method: () => AxiosPromise<T>) {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    const getPopular = async () => {
      if (data) {
        return;
      }
      setLoading(true);
      try {
        const { data: axiousData } = await method();
        setData(axiousData);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(err);
      }
      setLoading(false);
    };

    getPopular();
  }, [method, setLoading, setData, setError, data]);

  return {
    data,
    loading,
    error,
  };
}
