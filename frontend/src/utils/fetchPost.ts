interface PostBody{
    "name"?:string,
    "description"?:string,
    "video"?:string,
    "comment"?:string
}

export default async function fetchPost(endpoint:string, port:string, body:PostBody){
    let error:any = null;
    let id = null
    let item = null;

    const AbortCont = new AbortController()
    if(!endpoint.startsWith('/')){
        endpoint = '/' + endpoint
    }
    if(!endpoint.endsWith('/')){
        endpoint = endpoint + '/'
    }
    let path = 'http://localhost:' + port.trim() + endpoint.trim() + 'add/'    
    try{
        const response = await fetch(path, 
            {method:"POST",
             signal: AbortCont.signal,
             body:JSON.stringify(body), 
             headers: {"Content-Type": "application/json"}
            })
        if(!response.ok){
            error = "Error while fetching"
        }
        const item = await response.json()        
        if(error && item["video"]){
            error = "Video link is invalid"
        }else if(error && item["error"]){
            error = item["error"]
        }
        id = item.id
    }catch(err:any){
        if(err.name == "AbortError"){
            console.log("post aborted");
        }else{
            error = err
        }
    }
    return [id, error, item]
}