import './styles/Agreement.scss'

interface AgreementProps{
    name: string | undefined,
    visibility: React.Dispatch<React.SetStateAction<boolean>>,
    onDelete: (name:string | undefined) => void
}

function Agreement({name, visibility, onDelete} : AgreementProps){

    return(
        <section className='container'>
            <article className="agreeWindow">
                <h4 className="agreeWindow__title">Are you sure you want to delete:</h4>
                <p className="agreeWindow__name">{name}</p>
                <div className='button-flex'>
                    <button onClick={()=>{onDelete(name); visibility(false)}} className="agreeWindow__yes">YES</button>
                    <button onClick={()=>{visibility(false)}} className="agreeWindow__no">NO</button>
                </div>
            </article>
        </section>
    )
}

export default Agreement