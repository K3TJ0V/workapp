import type { WorkoutItem } from "./utils/classes";
import './styles/WorkoutComp.scss'
import { useRef, useState, type RefObject } from "react";
import WorkoutItemComp from "./WorkoutItemComp";
import trash from './assets/trash.svg'
import Agreement from "./Agreement";
import { fetchDelete } from "./fetchers/fetchDelete";
import type { popupData } from "./utils/popupData";
import Popup from "./Popup";
import WorkoutItemCreator from "./WorkoutItemCreator";

interface WorkoutCompProps {
  id: number;
  descriptive_name: string | undefined;
  workout_items: WorkoutItem[];
  handleUiUpdate: (id:number)=>void;
  handleWorkoutItemAdd: (workId: number, newItem : WorkoutItem) => void;
  handleWorkoutItemDeletion : (workoutId: number , workoutItemId: number) => void;
}
function WorkoutComp({
  id,
  descriptive_name,
  workout_items,
  handleUiUpdate,
  handleWorkoutItemAdd,
  handleWorkoutItemDeletion
}: WorkoutCompProps) {
  const [showList, setShowList] = useState<boolean>(false)
  const showButtonRef = useRef<HTMLButtonElement>(null)
  const [agreement, setAgreement] = useState<boolean>(false)
  const [workoutItemCreatorVisibility, setWorkoutItemCreatorVisibility] = useState(false);
  const [popupData, setPopupData] = useState<popupData>()
  const [popup, setPopup] = useState(false)

  function handleOnClick(){
    setShowList(!showList)
    const button = showButtonRef.current
    if(button !== null){
      showList ? button.classList.remove("listShown") : button.classList.add("listShown")
    }
  }
  function handleDelete(
    yes: RefObject<HTMLButtonElement | null>,
    no: RefObject<HTMLButtonElement | null>,
    name?: string | undefined,
    id?: number | undefined
  ){
    const deleting = async () =>{
      if(!id){
        setAgreement(false);
        console.log("Something went wrong while passing workout id");
        return
      }
      if(yes.current && no.current){
        yes.current.setAttribute("disabled", "")
        no.current.setAttribute("disabled", "")
      }
      const response = await fetchDelete("workouts/delete", "8000", "id", id, descriptive_name);
      const result = await response;
      if(result.error){
        console.log(result.error);
        return
      }
      if(result.message){
        console.log(result.message);
      }
      handleUiUpdate(id)
      setAgreement(false)
    }
    deleting();
  }
  return (
    <>
    {popup && popupData && 
    <Popup content={popupData.content} result={popupData.result}/>}
    {workoutItemCreatorVisibility && <WorkoutItemCreator 
      workoutId={id}
      visibilitySetter={setWorkoutItemCreatorVisibility}
      handleWorkoutItemAdd={handleWorkoutItemAdd}/>
      }
    <article className="workouts__item">
      <button onClick={()=>{setAgreement(true)}} className="workouts__item--delete"><img src={trash} alt="trash-icon" /></button>
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
    {agreement && <Agreement id={id} name={descriptive_name} visibility={setAgreement} onDelete={handleDelete}/>}
    </>
  );
}


export default WorkoutComp;
