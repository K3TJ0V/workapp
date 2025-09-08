import './styles/ExCreator.scss'

interface ExCreatorProps{
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>
}

function ExCreator({setVisibility}: ExCreatorProps){

    return (
        <>
            <section className='main__creator'>
                <div className='close-flex'>
                    <button onClick={()=>setVisibility(false)} className='main__creator--close'>CLOSE</button>
                </div>
                <article className="window">
                    <h3 className="window__title">New Exercise</h3>
                    <label className='label-flex' htmlFor="name">
                        Name:
                        <input className='window__input' placeholder='eg. OHP' type="text" name="name" id="name"/>
                    </label>
                    <label className='label-flex' htmlFor="description">
                        Description: 
                        <textarea className='window__input' rows={8} placeholder='description' name="description" id="description"></textarea>
                    </label>
                    <label className='label-flex' htmlFor="video">
                        Video: 
                        <input className='window__input' placeholder='https://.....' type="text" name="video" id="video"/>
                    </label>
                    <button className="window__create">Create</button>
                </article>
            </section>
        </>
    )
}

export default ExCreator