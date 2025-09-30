import type { WorkoutItem } from "./utils/classes";


interface WorkoutCompProps{
    id:number;
    descriptive_name: string | undefined;
    workout_items: WorkoutItem[]; 
}

function WorkoutComp( {id, descriptive_name, workout_items} : WorkoutCompProps){
    return (
        <article className="workouts__item">
            <h3 className="workouts__item--name">{descriptive_name}</h3>
        </article>
    )
}

export default WorkoutComp