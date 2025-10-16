import { useEffect, useState } from "react";
import { handleWorkoutWithItemsFetch } from "../utils/handleWorkoutWithItemsFetch";
import { handleExercisesFetch } from "../utils/handleExercisesFetch";
import { fetchTypeCheck } from "../utils/fetchTypeCheck";

const useFetchGet = <T>(url: string, port: string) => {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [Error, setError] = useState<any>(null);

  useEffect(() => {
    const abort = new AbortController();
    setTimeout(() => {
      if (!url.startsWith("/")) {
        url = "/" + url;
      }
      if (!url.endsWith("/")) {
        url = url + "/";
      }
      let path = `http://localhost:${port.trim()}/creator` + url.trim();
      const getData = async () => {
        try {
          const response = await fetch(path, {
            signal: abort.signal,
          });
          const result = await response.json();
          switch (fetchTypeCheck(result)) {
            case "WorkoutWithItems": {
              const state = handleWorkoutWithItemsFetch(result);
              setData(state as T[]);
              break;
            }
            case "Exercise":
              const state = handleExercisesFetch(result)
              setData(state as T[])
              break;
            case "empty":
              null;
              break;
          }
          setData(result);
        } catch (err) {
          const Err = new Error(err);
          if (Err.name == "AbortError") {
            console.log("fetch aborted");
          } else {
            setError(Err);
          }
        } finally {
          setIsLoading(false);
        }
      };
      getData();
      return () => abort.abort();
    }, 3000);
  }, [url, port]);
  return { data, setData, isLoading, Error };
};

export default useFetchGet;
