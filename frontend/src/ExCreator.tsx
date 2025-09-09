import { useEffect, useState } from 'react';
import './styles/ExCreator.scss'
import useFetchPost from './utils/fetchPost';
import { Exercise } from './utils/classes';

interface ExCreatorProps{
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>,
    handleExAdd : (ex : Exercise) => void
}
interface PostBody{
    "name"?:string,
    "description"?:string,
    "video"?:string,
    "comment"?:string
}

function ExCreator({setVisibility, handleExAdd}: ExCreatorProps){
    const [postData, setPostData] = useState<PostBody>({})
    useEffect(()=>{
        if(!postData["name"]){
            return
        }
        const postItem = async () => {
            const [id, error] = await useFetchPost("/creator/exercises/", "8000", postData)
            if(error){
                console.log(error);
                return
            }
            if(id && postData["name"]){
                const newEx = new Exercise(id, postData["name"], postData["description"], postData["video"], postData["comment"])
                handleExAdd(newEx)
            }
        }
        postItem()        
    }, [postData])

    function handleOnSubmit(formData:FormData){
        let data:PostBody = {}
        data["name"] = String(formData.get("name"))
        if(formData.get("description")){
            data["description"] = String(formData.get("description"))
        }
        if(formData.get("video")){
            data["video"] = String(formData.get("video"))
        }
        if(formData.get("comment")){
            data["comment"] = String(formData.get("comment"))
        }
        setPostData(data)
    }

    return (
        <>
            <section className='main__creator'>
                <div className='close-flex'>
                    <button onClick={()=>setVisibility(false)} className='main__creator--close'>CLOSE</button>
                </div>
                <article className="window">
                    <h3 className="window__title">New Exercise</h3>
                    <form onSubmit={(e)=>{
                        e.preventDefault();
                        handleOnSubmit(new FormData(e.currentTarget))
                    }}>
                        <label className='label-flex' htmlFor="name">
                            Name:
                            <input className='window__input' placeholder='eg. OHP' type="text" name="name" id="name" required/>
                        </label>
                        <label className='label-flex' htmlFor="description">
                            Description: 
                            <textarea className='window__input' rows={8} placeholder='description' name="description" id="description"/>
                        </label>
                        <label className='label-flex' htmlFor="video">
                            Video: 
                            <input className='window__input' placeholder='https://.....' type="text" name="video" id="video"/>
                        </label>
                        <label className='label-flex' htmlFor="comment">
                            Comment: 
                            <textarea className='window__input' rows={3} placeholder='comment' name="comment" id="comment"/>
                        </label>
                        <button type='submit' className="window__create">Create</button>
                    </form>
                </article>
            </section>
        </>
    )
}

export default ExCreator