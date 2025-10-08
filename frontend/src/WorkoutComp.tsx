import type { WorkoutItem } from "./utils/classes";
import './styles/WorkoutComp.scss'
import { useRef, useState, type RefObject } from "react";
import WorkoutSetComp from "./WorkoutSetComp";
import trash from './assets/trash.svg'
import Agreement from "./Agreement";
import { fetchDelete } from "./utils/fetchDelete";

interface WorkoutCompProps {
  id: number;
  descriptive_name: string | undefined;
  workout_items: WorkoutItem[];
  handleUiUpdate: (id:number)=>void;
}
function WorkoutComp({
  id,
  descriptive_name,
  workout_items,
  handleUiUpdate
}: WorkoutCompProps) {
  const [showList, setShowList] = useState<boolean>(false)
  const showButtonRef = useRef<HTMLButtonElement>(null)
  const [agreement, setAgreement] = useState<boolean>(false)

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
      const response = await fetchDelete("workouts/delete", "8000", "id", id, descriptive_name);
      const result = await response;
      if(result.error){
        console.log(result.error);
        return
      }
      console.log(result.message);
      handleUiUpdate(id)
      setAgreement(false)
    }
    deleting();
  }
  return (
    <>
    <article className="workouts__item">
      <button onClick={()=>{setAgreement(true)}} className="workouts__item--delete"><img src={trash} alt="trash-icon" /></button>
      <h3 className="workouts__item--name">{descriptive_name}</h3>
      {showList &&
      <section className="workouts__item--content">
        {workout_items.map((set) => {
          return <WorkoutSetComp key={set.id} set={set}/>
        })}
      </section>
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
