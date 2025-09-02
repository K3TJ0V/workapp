import './styles/App.scss'
import Navbar from './Navbar'
import ExerciseBase from './ExerciseBase'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App(){

    return(
        <Router>
            <Navbar/>
            <main className='main'>
                <Routes>
                    <Route path='/ex-base' element={ <ExerciseBase/>}/>
                </Routes>
            </main>
        </Router>
    )
}

export default App