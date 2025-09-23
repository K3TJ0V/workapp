import { useEffect, useState, useRef } from 'react';
import './styles/ExCreator.scss'
import fetchPost from './utils/fetchPost';
import { Exercise } from './utils/classes';
import Popup from './Popup';
import type { popupData } from './utils/popupData';

interface ExCreatorProps{
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>,
    handleExAdd : (ex : Exercise) => void
}
interface PostBody{
    "name":string,
    "description"?:string,
    "video"?:string,
    "comment"?:string
}

function ExCreator({setVisibility, handleExAdd}: ExCreatorProps){
    const [postData, setPostData] = useState<PostBody>({name: ""})
    const [popup, setPopup] = useState<boolean>(false);
    const [popupData, setPopupData] = useState<popupData>()
    const submitRef = useRef<HTMLButtonElement>(null)
    const closeRef = useRef<HTMLButtonElement>(null)

    useEffect(()=>{
        if(!postData["name"]){
            return
        }
        const postItem = async () => {
            submitRef.current!.setAttribute("disabled", "")
            closeRef.current!.setAttribute("disabled", "")
            const [id, result] = await fetchPost("/creator/exercises/", "8000", postData)
            if(result.error){
                setPopup(true)
                setPopupData({content: result.error, result: "error"})
                setTimeout(()=>{
                    setPopup(false)
                },2100)
                submitRef.current!.removeAttribute("disabled")
                closeRef.current!.removeAttribute("disabled")
                return
            }
            if(id && postData.name){
                const newEx = new Exercise(id, postData.name, postData.description, postData.video, postData.comment)
                if(result.message){
                    setPopup(true)
                    setPopupData({content: result.message, result: "message"})
                    setTimeout(()=>{
                        setPopup(false)
                    },2100)
                }
                handleExAdd(newEx)
            }
            submitRef.current!.removeAttribute("disabled")
            closeRef.current!.removeAttribute("disabled")
        }
        postItem()
    }, [postData])

    function handleOnSubmit(formData:FormData){
        let data:PostBody = {name: ""}
        data.name = String(formData.get("name"))
        if(formData.get("description")){
            data.description = String(formData.get("description"))
        }
        if(formData.get("video")){
            data.video = String(formData.get("video"))
        }
        if(formData.get("comment")){
            data.comment = String(formData.get("comment"))
        }
        setPostData(data)
    }

    return (
        <>
          {popup && popupData && <Popup content={popupData.content} result={popupData.result}/>}
            <section className='main__creator'>
                <div className='close-flex'>
                    <button ref={closeRef} onClick={()=>setVisibility(false)} className='main__creator--close'>CLOSE</button>
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
                            <input className='window__input' placeholder='https://.....' type="url" name="video" id="video"/>
                        </label>
                        <label className='label-flex' htmlFor="comment">
                            Comment: 
                            <textarea className='window__input' rows={3} placeholder='comment' name="comment" id="comment"/>
                        </label>
                        <button ref={submitRef} type='submit' className="window__create">Create</button>
                    </form>
                </article>
            </section>
        </>
    )
}

export default ExCreator