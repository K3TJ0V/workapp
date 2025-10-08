interface returnedValue{
    "message"?: string,
    "error"?: any
}

export async function fetchDelete(path:string, port: string, deleteOn: string, id?:number, name?:string){
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
    let url = `http://localhost:${port.trim()}/creator` + path
    
    if(name !== undefined && deleteOn === "name"){
        if(name.split(' ').length > 1){
            name = name.trim().replaceAll(' ', '%20')
            url += name + '/';
        }else{
            url += name + '/';
        }
    }
    if(id !== undefined && deleteOn === "id"){        
        url += String(id) + '/';
    }
    try{
        const data = await fetch(url, {method: "DELETE"})
        result.message = `Item ${name} has been deleted succesfully`
    }catch(err){
        result.error = err
    }
    const delay = await new Promise(resolve => setTimeout(resolve, 2000))
    return result
}

