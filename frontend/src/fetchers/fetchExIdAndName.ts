import type { IdAndName } from "./ExIdAndName";

interface result<T>{
    error: boolean,
    data: T;
}

export async function fetchExIdAndName() { 
    let returnedData : result<IdAndName[] | string>;
    try{
        const request = await fetch('http://localhost:8000/creator/exercises/show-only-id-and-name/');
        const response : IdAndName[] = await request.json();
        returnedData = {
            error : false,
            data : response
        }
        const delay = await new Promise( resolve =>{setTimeout(resolve, 2000)})
        return returnedData
    }catch(err){
        returnedData = {
            error: true,
            data: "Something went wrong while fetching"
        }
        return returnedData
    }
}
