interface putBody{
    name?: string;
    description?: string;
    video?: string;
    comment?: string
}
interface returnedValue{
    "message"?: string,
    "error"?: any
}

export async function fetchPut(endpoint:string, port:string, updatedExName: string, reqBody: putBody){
    let result: returnedValue = {};
    
    if(!endpoint.startsWith('/')){
        endpoint = '/' + endpoint
    }
    if(!endpoint.endsWith('/')){
        endpoint = endpoint + '/'
    }
    if(updatedExName.split(" ").length > 1){
        updatedExName = updatedExName.trim().replaceAll(' ', "%20")
    }
    const url = `http://localhost:${port.trim()}/creator` + endpoint + updatedExName.trim() + '/'
    try{
        console.log(reqBody);
        const request = await fetch(url, 
            {method: "PUT",
             body: JSON.stringify(reqBody), 
             headers: {"Content-Type":"application/json"}})
        if(request.ok){
            result.message = `Exercise: ${updatedExName.replaceAll("%20", ' ')} has been updated succesfully`
        }
    }catch(err){
        result.error = `Exercise: ${updatedExName.replaceAll("%20", ' ')} couldn't be updated`
    }
    return result
}