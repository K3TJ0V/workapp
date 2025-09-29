import { useState } from 'react'
import './styles/Workouts.scss'
import { Workout } from './utils/classes'
import WorkoutComp from './WorkoutComp'

function Workouts(){
    const [workouts, setWorkouts] = useState<Workout[]>([{id: 1, descriptive_name: "null"},{id: 1, descriptive_name: "null"}])

    return(
        <>
            <section className="workouts">
                {workouts && workouts.map((item)=>{
                    return <WorkoutComp id={item.id} descriptive_name={item.descriptive_name}/>
                })}
            </section>
        </>
    )
}

export default Workouts