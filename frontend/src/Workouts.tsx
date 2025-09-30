import { useEffect, useState } from 'react'
import './styles/Workouts.scss'
import { Workout, WorkoutItem } from './utils/classes'
import WorkoutComp from './WorkoutComp'
import useFetchGet from './hooks/useFetchGet'

interface WorkoutWithItems{
    id: number;
    descriptive_name: string | undefined;
    workout_items: WorkoutItem[];
}


function Workouts(){
    const {data, isLoading, Error} = useFetchGet('creator/workouts', '8000')
    const [workouts, setWorkouts] = useState<WorkoutWithItems[]>()

    useEffect(()=>{
        if(data){
            let test : WorkoutWithItems[] = []
            data.forEach((work : WorkoutWithItems)=>{
                let result: WorkoutWithItems = {
                    id: work.id,
                    descriptive_name: work.descriptive_name,
                    workout_items: []
                }
                work.workout_items.forEach((item:WorkoutItem)=>{
                    const newItem = new WorkoutItem(item.id, item.sets, item.exercise, item.workout)
                    item.weight ? newItem.weight = item.weight : null;
                    item.reps ? newItem.reps = item.reps : null;
                    item.time ? newItem.time = item.time : null;
                    item.tempo ? newItem.tempo = item.tempo : null;
                    result.workout_items.push(newItem)
                })
                test.push(result)
            })
            setWorkouts(test)
        }
    }, [data])
    return(
        <>
            <section className="workouts">
                {isLoading && "Loading..."}
                {Error && "Error while downloading content"}
                {workouts && workouts.map((item)=>{
                    return <WorkoutComp key={item.id} id={item.id} descriptive_name={item.descriptive_name} workout_items={item.workout_items}/>
                })}
            </section>
        </>
    )
}

export default Workouts