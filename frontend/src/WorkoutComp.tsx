
interface WorkoutCompProps{
    id:number;
    descriptive_name: string | undefined
}

function WorkoutComp( {id, descriptive_name} : WorkoutCompProps){


    return (
        <article className="workouts__item">
            <h3 className="workouts__item--name">{descriptive_name}</h3>
        </article>
    )
}

export default WorkoutComp