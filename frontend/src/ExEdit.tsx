import { useState } from 'react'
import './styles/ExEdit.scss'
import type { Exercise } from './utils/classes'

interface ExEditProps{
    item: Exercise | undefined;
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
    handleEdition : (FormData : FormData) => void
}

function ExEdit({item, setVisibility, handleEdition} : ExEditProps){
    const [nameVisibility, setNameVisibility] = useState<boolean>(false)
    const [descVisibility, setDescVisibility] = useState<boolean>(false)
    const [videoVisibility, setVideoVisibility] = useState<boolean>(false)
    const [commentVisibility, setCommentVisibility] = useState<boolean>(false)
    const buttonVisibility = nameVisibility || descVisibility || videoVisibility || commentVisibility

    return(
        <>
        {item ? 
            <section className='container'>
                <article className="container__checkboxes">
                    <button onClick={()=>{setVisibility(false)}} className='container__checkboxes--close'>CLOSE</button>
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
                            handleEdition(new FormData(e.currentTarget))
                        }} className='container__editForm--form'>
                            <div className="container__editForm--inputs">
                                {nameVisibility && <label><input className="inp" placeholder={item.name} type="text" name="nameEdit" id="nameEdit" required/></label>}
                                {descVisibility && <label><textarea rows={7} className="inp" placeholder={item.description} name="descEdit" id="descEdit"/></label>}
                                {videoVisibility && <label><input className="inp" placeholder={item.video} type="text" name="videoEdit" id="videoEdit" /></label>}
                                {commentVisibility && <label><input className="inp" placeholder={item.comment} type="text" name="commentEdit" id="commentEdit" /></label>}
                            </div>
                            {buttonVisibility && <button className="container__button">Edit</button>}
                        </form>
                    </article>
                </article>
            </section> : console.error("Exercise is undefined")}
        </>
    )
}

export default ExEdit