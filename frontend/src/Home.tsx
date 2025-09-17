import './styles/Home.scss'

function Home(){
    return(
        <>
            <section className='main__homeFlex'>
                <h2 className="main__h2">App Name</h2>
                <p className="main__description">App Name is an app for:</p>
                <ul className="main__list">
                    <li className="main__list--point">Maintaining exercise base (adding, deleting, editing)</li>
                    <li className="main__list--point">Creating workouts and exporting .xlsx files with pre-created theme</li>
                    <li className="main__list--point">More functionality might be avaiable soon...</li>
                </ul>
            </section>
        </>
    )
}

export default Home