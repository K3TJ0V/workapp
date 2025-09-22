import './styles/Popup.scss'
import { useEffect, useRef } from 'react'
import type { popupData } from './utils/popupData';

export default function Popup( {content, result} : popupData ){
    const ref = useRef<HTMLElement>(null);
    useEffect(()=>{
        if(ref.current === null){
            return
        }
        if(result === "error"){
            ref.current.style.backgroundColor = "#cf0000"
        }
        ref.current.classList.add("setInAnimation")
        setTimeout(()=>{
            ref.current!.classList.remove("setInAnimation")
            ref.current!.classList.add("setOutAnimation")
        }, 2000)
    })
    return(
        <>
            <section ref={ref} className='popup'>
                <h4 className="popup__content">{content}</h4>
            </section>
        </>
    )
}