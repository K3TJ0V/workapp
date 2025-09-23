import { useRef, type RefObject } from 'react'
import './styles/Agreement.scss'

interface AgreementProps{
    name: string | undefined,
    visibility: React.Dispatch<React.SetStateAction<boolean>>,
    onDelete: (name:string | undefined,
        yes: RefObject<HTMLButtonElement | null>, 
        no: RefObject<HTMLButtonElement | null>) => void
}

function Agreement({name, visibility, onDelete} : AgreementProps){
    const yesRef = useRef<HTMLButtonElement>(null)
    const noRef = useRef<HTMLButtonElement>(null)
    return(
        <section className='container'>
            <article className="agreeWindow">
                <h4 className="agreeWindow__title">Are you sure you want to delete:</h4>
                <p className="agreeWindow__name">{name}</p>
                <div className='button-flex'>
                    <button ref={yesRef} onClick={()=>{onDelete(name, yesRef, noRef)}} className="agreeWindow__yes">YES</button>
                    <button ref={noRef} onClick={()=>{visibility(false)}} className="agreeWindow__no">NO</button>
                </div>
            </article>
        </section>
    )
}

export default Agreement