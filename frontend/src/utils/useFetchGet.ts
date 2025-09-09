import { useEffect, useState } from "react";

const useFetchGet = (url:string, port:string) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [Error, setError] = useState<any>(null)

    useEffect(()=>{
        const abort = new AbortController()
        setTimeout(()=>{
            if(!url.startsWith('/')){
                url = '/' + url
            }
            if(!url.endsWith('/')){
                url = url + '/'
            }
            let path = 'http://localhost:' + port.trim() + '/' + url.trim()
            const getData = async () => {
                try{
                    const response = await fetch(path, {method: "GET", signal: abort.signal})
                    if(!response.ok){
                        setError("Fetch failed")
                    }
                    const result = await response.json()
                    setData(result) 
                }catch(err){
                    const Err = new Error(err);
                    if(Err.name == "AbortError"){
                        console.log("fetch aborted");
                    }else{
                        setError(Err)
                    }
                }finally{
                    setIsLoading(false)
                }
            }
            getData()
            return () => abort.abort()
        }, 3000)
    }, [url, port])
    return { data, isLoading, Error }

}

export default useFetchGet

