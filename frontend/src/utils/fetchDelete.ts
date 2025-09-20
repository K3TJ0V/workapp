interface returnedValue{
    "message"?: string,
    "error"?: any
}

export async function fetchDelete(path:string, port: string, name:string){
    let result : returnedValue = {}
    
    if(!path.startsWith('/')){
        path = '/' + path
    }
    if(!path.endsWith('/')){
        path = path + '/'
    }
    if(port.startsWith('/')){
        port = port.substring(1, port.length-1) 
    }
    if(port.endsWith('/')){
        port = port.substring(0, port.length-2) 
    }
    if(name.split(' ').length > 1){
        name = name.trim().replaceAll(' ', '%20')
    }
    const url = `http://localhost:${port.trim()}/creator` + path + name.trim() + '/'    
    try{
        const data = await fetch(url, {method: "DELETE", headers: {"Content-Type": "application/json"}})
        result.message = `item ${name} has been deleted succesfully`
    }catch(err){
        result.error = err
    }
    return result
}

