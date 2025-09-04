import './styles/App.scss'
import Navbar from './Navbar'
import ExerciseBase from './ExerciseBase'
import Workouts from './Workouts'
import Home from './Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
 
function App(){

    return(
        <Router>
            <Navbar/>
            <main className='main'>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/ex-base' element={<ExerciseBase/>}/>
                    <Route path='/workouts' element={<Workouts/>}/>
                </Routes>
            </main>
        </Router>
    )
}

export default App