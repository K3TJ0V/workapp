import type { WorkoutItem } from "./utils/classes";
import './styles/WorkoutComp.scss'
import { useRef, useState } from "react";
import WorkoutItemComp from "./WorkoutItemComp";
import trash from './assets/trash.svg'
import WorkoutItemCreator from "./WorkoutItemCreator";

interface WorkoutCompProps {
  id: number;
  descriptive_name: string | undefined;
  workout_items: WorkoutItem[];
  handleWorkoutItemAdd: (workId: number, newItem : WorkoutItem) => void;
}
function WorkoutComp({
  id,
  descriptive_name,
  workout_items,
  handleWorkoutItemAdd
}: WorkoutCompProps) {
  const [showList, setShowList] = useState<boolean>(false)
  const showButtonRef = useRef<HTMLButtonElement>(null)
  const [workoutItemCreatorVisibility, setWorkoutItemCreatorVisibility] = useState(false);

  function handleOnClick(){
    setShowList(!showList)
    const button = showButtonRef.current
    if(button !== null){
      showList ? button.classList.remove("listShown") : button.classList.add("listShown")
    }
  }
  
  return (
    <>
    {workoutItemCreatorVisibility && <WorkoutItemCreator 
      workoutId={id}
      visibilitySetter={setWorkoutItemCreatorVisibility}
      handleWorkoutItemAdd={handleWorkoutItemAdd}/>
      }
    <article className="workouts__item">
      <button onClick={()=>{}} className="workouts__item--delete"><img src={trash} alt="trash-icon" /></button>
      <h3 className="workouts__item--name">{descriptive_name}</h3>
      {showList &&
      <>
      <div className="workItem-addButto-center">
        <button onClick={()=>{setWorkoutItemCreatorVisibility(!workoutItemCreatorVisibility)}} className="workouts__item--addNew">Add new</button>
      </div>
      <hr className="workoutList-separator"/>
      <section className="workouts__item--content">
        {workout_items.map((set) => {
          return <WorkoutItemComp key={set.id} workoutItem={set}/>
        })}
      </section>
      </>
    }
    <div className="buttonFlex">
      <button ref={showButtonRef} className="workouts__item--showButton" onClick={handleOnClick}>{">"}</button>
    </div>
    </article>
    </>
  );
}


export default WorkoutComp;
