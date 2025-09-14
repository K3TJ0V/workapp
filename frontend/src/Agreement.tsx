import './styles/Agreement.scss'

interface AgreementProps{
    name: string,
    visibility: React.Dispatch<React.SetStateAction<boolean>>
}

function Agreement({name, visibility} : AgreementProps){

    return(
        <section className='container'>
            <article className="agreeWindow">
                <h4 className="agreeWindow__title">Are you sure you want to delete:</h4>
                <p className="agreeWindow__name">{name}</p>
                <div className='button-flex'>
                    <button className="agreeWindow__yes">YES</button>
                    <button onClick={()=>{visibility(false)}} className="agreeWindow__no">NO</button>
                </div>
            </article>
        </section>
    )
}

export default Agreement