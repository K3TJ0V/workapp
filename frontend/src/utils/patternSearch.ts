export default function patternSearch(pattern:string, text:string){
    if(pattern === ''){
        return true
    }
    if(pattern.length > text.length || text.length == 0){
        return false
    }
    for(let i = 0; i <= text.length - pattern.length; i++){
        let patternFound = true
        for(let j = 0; j < pattern.length; j++){
            if(text[i+j] !== pattern[j]){
                patternFound = false
                break
            }
        }
        if(patternFound){
            return true
        }
    }
    return false
}