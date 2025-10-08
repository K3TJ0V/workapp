import { useEffect, useState } from "react";
import "./styles/Workouts.scss";
import { Workout, WorkoutItem } from "./utils/classes";
import WorkoutComp from "./WorkoutComp";
import useFetchGet from "./hooks/useFetchGet";
import searchIcon from './assets/search.svg'
import fetchPost from "./utils/fetchPost";

interface WorkoutWithItems {
  id: number;
  descriptive_name: string | undefined;
  workout_items: WorkoutItem[];
}

function Workouts() {
  const { data, isLoading, Error } = useFetchGet("creator/workouts", "8000");
  const [workouts, setWorkouts] = useState<WorkoutWithItems[]>();
  const [creatorVisibility, setCreatorVisibility] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      let fetchedWorkouts: WorkoutWithItems[] = [];
      data.forEach((work: WorkoutWithItems) => {
        let result: WorkoutWithItems = {
          id: work.id,
          descriptive_name: work.descriptive_name,
          workout_items: [],
        };
        work.workout_items.forEach((item: WorkoutItem) => {
          const newItem = new WorkoutItem(
            item.id,
            item.sets,
            item.exercise,
            item.workout
          );
          item.weight ? (newItem.weight = item.weight) : null;
          item.reps ? (newItem.reps = item.reps) : null;
          item.time ? (newItem.time = item.time) : null;
          item.tempo ? (newItem.tempo = item.tempo) : null;
          item.rir ? (newItem.rir = item.rir) : null;
          result.workout_items.push(newItem);
        });
        fetchedWorkouts.push(result);
      });
      setWorkouts(fetchedWorkouts);
    }
  }, [data]);

  async function handleWorkoutAdd(name:string){
    if(!name) return;
    let newWorkout : WorkoutWithItems = {
      id : -1,
      descriptive_name: name,
      workout_items: []
    };
    const [id, result] = await fetchPost('creator/workouts', "8000", {"descriptive_name": name})
    if(result.error){
      console.log(result.error);
      return;
    }
    newWorkout.id = id;
    console.log(result.message);
    if(workouts){
      setWorkouts([...workouts, newWorkout])
    }else{
      setWorkouts([newWorkout])
    }
    setCreatorVisibility(false);
  }
  function handleDeletion(id: number){
    setWorkouts(workouts?.filter((item)=>item.id !== id));
  }
  return (
    <>
      {creatorVisibility && <WorkoutCreator handleOnAdd={handleWorkoutAdd} setVisibility={setCreatorVisibility}/>}
      <div className="main__inpFlex">
        <button
          className="main__addWork"
          onClick={()=>{setCreatorVisibility(true)}}
        >
          <p className="highlight">+</p>
          <br />
          Add new workout
        </button>
        <label htmlFor="search" className="search-label">
          <input
            className="main__searchBar"
            type="text"
            name="search"
            id="search"
            placeholder="Name of the workout"
          />
          <img src={searchIcon} alt="search icon" className="searchIcon" />
        </label>
      </div>
      <section className="workouts">
        {isLoading && <p>Loading...</p>}
        {Error && "Error while downloading content"}
        {workouts &&
          workouts.map((item) => {
            return (
              <WorkoutComp
                key={item.id}
                id={item.id}
                descriptive_name={item.descriptive_name}
                workout_items={item.workout_items}
                handleUiUpdate={handleDeletion}
              />
            );
          })}
      </section>
    </>
  );
}
interface WorkoutCreatorProps{
  setVisibility:  React.Dispatch<React.SetStateAction<boolean>>;
  handleOnAdd: (name:string) => void;
}
function WorkoutCreator({setVisibility, handleOnAdd} : WorkoutCreatorProps){
  const [inputValue, setInputValue] = useState<string>("")

  return(
    <>
      <div className="workoutCreator-background"></div>  
      <section className="workoutCreator">
        <button onClick={()=>{setVisibility(false)}} className="workoutCreator__close">CLOSE</button>
        <label htmlFor="name" className="workoutCreator__label">
          Workout name:
          <input onChange={(e)=>{
            setInputValue(e.target.value)
          }} type="text" name="name" id="name" className="workoutCreator__input"/>
        </label>
        <button onClick={()=>{handleOnAdd(inputValue.trim())}} className="workoutCreator__add">Add</button>
      </section>
    </>
  )
} 

export default Workouts;
