import './styles/ExEdit.scss'

interface ExEditProps{
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

function ExEdit({setVisibility} : ExEditProps){


    return(
        <>
            <section className='container'>
                <article className="container__editWindow">
                    <button onClick={()=>{setVisibility(false)}} className='container__editWindow--close'>CLOSE</button>
                    <h4 className="container__editWindow--title">Select properties that you want to edit:</h4>
                    <label htmlFor="name">
                        <input type="checkbox" name="name" id="name" />
                        name
                    </label>
                    <label htmlFor="desc">
                        <input type="checkbox" name="desc" id="desc" />
                        description
                    </label>
                    <label htmlFor="video">
                        <input type="checkbox" name="video" id="video" />
                        video
                    </label>
                    <label htmlFor="comment">
                        <input type="checkbox" name="comment" id="comment" />
                        comment
                    </label>
                </article>
            </section>
        </>
    )
}

export default ExEdit