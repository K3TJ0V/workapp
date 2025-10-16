import { useEffect, useState } from "react";

function useFetchPost<T>(
  endpoint: string,
  port: string,
) {
  const [loading, setLoading] = useState<boolean>(false);
  const [returnedItem, setReturnedItem] = useState<T>();
  const [body, setBody] = useState<T>()
  const [postError, setPostError] = useState<any>();

  const AbortCont = new AbortController();

  async function fetchPost<T>(endpoint: string, port: string, postBody: T | null) {
    if (!endpoint.startsWith("/")) {
      endpoint = "/" + endpoint;
    }
    if (!endpoint.endsWith("/")) {
      endpoint = endpoint + "/";
    }
    let path =
      `http://localhost:${port.trim()}/creator` + endpoint.trim() + "add/";
    try {
      setLoading(true);
      const response = await fetch(path, {
        method: "POST",
        signal: AbortCont.signal,
        body: JSON.stringify(postBody),
        headers: { "Content-Type": "application/json" },
      });
      const res = await response.json();
      const delay = await new Promise((resolve, reject)=>{setTimeout(resolve, 2000)})
      setReturnedItem(res)
    } catch (err: any) {
      if (err.name == "AbortError") {
        console.log("post aborted");
      } else {
        setPostError(err);
      }
    }finally{
        setLoading(false)
    }
  }

  useEffect(() => {
    if(body){
        fetchPost(endpoint, port, body);
    }
  }, [body]);
  return { returnedItem, loading, postError, setBody};
}

export default useFetchPost;