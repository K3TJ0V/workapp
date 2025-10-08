interface ExerciseBody{
    "name"?:string,
    "description"?:string,
    "video"?:string,
    "comment"?:string
}
interface WorkoutBody{
    "descriptive_name" :string
}
interface returnedValue{
    "message"?: string,
    "error"?: string
}

export default async function fetchPost(endpoint:string, port:string, body:WorkoutBody|ExerciseBody){
    let id = null
    let result : returnedValue = {}
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
        const res = await response.json()
        if(!response.ok && res.error){
            result.error = res.error
            return [null, result]
        }        
        id = res.id
        result.message = `New item was created sucessfully`
    }catch(err:any){
        if(err.name == "AbortError"){
            console.log("post aborted");
        }else{
            result.error = err;
        }
    }
    const delay = await new Promise(resolve => setTimeout(resolve, 2000))
    return [id, result]
}