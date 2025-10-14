import { useRef, useState } from 'react'
import './styles/ExEdit.scss'
import type { Exercise } from './utils/classes'
import { fetchPut } from './fetchers/fetchPut';
import Popup from './Popup';
import type { popupData } from './utils/popupData';

interface ExEditProps{
    item: Exercise | undefined;
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

interface fetchBody{
    name?: string,
    description?: string,
    video?: string,
    comment?: string
}

function ExEdit({item, setVisibility} : ExEditProps){
    const [nameVisibility, setNameVisibility] = useState<boolean>(false)
    const [descVisibility, setDescVisibility] = useState<boolean>(false)
    const [videoVisibility, setVideoVisibility] = useState<boolean>(false)
    const [commentVisibility, setCommentVisibility] = useState<boolean>(false)
    const buttonVisibility = nameVisibility || descVisibility || videoVisibility || commentVisibility
    const [popup, setPopup] = useState<boolean>(false);
    const [popupData, setPopupData] = useState<popupData>()
    const editRef = useRef<HTMLButtonElement>(null)
    const closeRef = useRef<HTMLButtonElement>(null)

    function handleOnSubmit(formData: FormData){
        let fetchBody: fetchBody = {}
        const name = String(formData.get("nameEdit")).trim()
        const desc = String(formData.get("descEdit")).trim()
        const video = String(formData.get("videoEdit")).trim()
        const comment = String(formData.get("commentEdit")).trim()
        if(item === undefined){
            console.log("Something went wrong");
            return  
        }
        if(name !== "null"){
            fetchBody.name = name;
        }else{
            fetchBody.name = item.name
        }
        if(desc !== "null"){
            fetchBody.description = desc
        }
        if(video !== "null"){
            fetchBody.video = video
        }
        if(comment !== "null"){
            fetchBody.comment = comment
        }
        const putData = async () => {
            if(!editRef.current || !closeRef.current){
                return 
            }
            editRef.current.setAttribute("disabled", "")
            closeRef.current.setAttribute("disabled", "")
            const request = await fetchPut(`exercises/update/`, "8000", item.name, fetchBody)
            if(request.error){
                setPopupData({content: request.error, result: "error"})
                setPopup(true)
                setTimeout(()=>{
                    setPopup(false)
                }, 2100)
                editRef.current.removeAttribute("disabled")
                closeRef.current.removeAttribute("disabled")
                return
            }
            if(request.message === undefined){
                editRef.current.removeAttribute("disabled")
                closeRef.current.removeAttribute("disabled")
                return
            }
            setPopupData({content: request.message, result: "message"})
            setPopup(true)
            setTimeout(()=>{
                setPopup(false)
            }, 2100)
            editRef.current.removeAttribute("disabled")
            closeRef.current.removeAttribute("disabled")
        }
        putData();

        Object.assign(item, fetchBody)
    }

    return(
        <>
        {popup && popupData && <Popup content={popupData.content} result={popupData.result}/>}
        {item ? 
            <section className='container'>
                <article className="container__checkboxes">
                    <button ref={closeRef} onClick={()=>{setVisibility(false)}} className='container__checkboxes--close'>CLOSE</button>
                    <h4 className="container__checkboxes--title">Select properties of <p className='highlight'>{item ? item.name : "ERROR: something went wrong"}</p> that you want to edit:</h4>
                    <div className="container__checkboxes--grid">
                        <label className='label' htmlFor="name">
                            <input onChange={()=>{setNameVisibility(!nameVisibility)}} className='checkbox' type="checkbox" name="name" id="name" />
                            name
                        </label>
                        <label className='label' htmlFor="desc">
                            <input onChange={()=>{setDescVisibility(!descVisibility)}} className='checkbox' type="checkbox" name="desc" id="desc" />
                            description
                        </label>
                        <label className='label' htmlFor="video">
                            <input onChange={()=>{setVideoVisibility(!videoVisibility)}} className='checkbox' type="checkbox" name="video" id="video" />
                            video
                        </label>
                        <label className='label' htmlFor="comment">
                            <input onChange={()=>{setCommentVisibility(!commentVisibility)}} className='checkbox' type="checkbox" name="comment" id="comment" />
                            comment
                        </label>
                    </div>
                    <article className='container__editForm'>
                        <form onSubmit={(e)=>{
                            e.preventDefault()
                            handleOnSubmit(new FormData(e.currentTarget))
                        }} className='container__editForm--form'>
                            <div className="container__editForm--inputs">
                                {nameVisibility && <label><input className="inp" placeholder={item.name} type="text" name="nameEdit" id="nameEdit" required/></label>}
                                {descVisibility && <label><textarea rows={7} className="inp" placeholder={item.description} name="descEdit" id="descEdit"/></label>}
                                {videoVisibility && <label><input className="inp" placeholder={item.video} type="url" name="videoEdit" id="videoEdit" /></label>}
                                {commentVisibility && <label><input className="inp" placeholder={item.comment} type="text" name="commentEdit" id="commentEdit" /></label>}
                            </div>
                            {buttonVisibility && <button ref={editRef} className="container__button">Edit</button>}
                        </form>
                    </article>
                </article>
            </section> : console.error("Exercise is undefined")}
        </>
    )
}

export default ExEdit