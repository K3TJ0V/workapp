import "./styles/Workouts.scss";
import { useEffect, useState } from "react";
import type { WorkoutWithItems } from "./utils/WorkoutWithItems.ts";
import { WorkoutItem } from "./utils/classes";
import searchIcon from "./assets/search.svg";
import WorkoutComp from "./WorkoutComp";
import useFetchGet from "./hooks/useFetchGet";
import patternSearch from "./utils/patternSearch.ts";
import WorkoutCreator from "./WorkoutCreator.tsx";

function Workouts() {
  const { data, setData, isLoading, Error } = useFetchGet<WorkoutWithItems>("workouts", "8000");
  const [search, setSearch] = useState<WorkoutWithItems[]>([]);
  const [creatorVisibility, setCreatorVisibility] = useState<boolean>(false);

  useEffect(()=>{
    if(data){
      setSearch(data)
    }
  }, [data])

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.trim() === "") {
      setSearch(data);
      return;
    }
    setSearch(
      data?.filter((item) =>
        patternSearch(e.target.value.trim(), item.descriptive_name)
      )
    );
  }
  function handleWorkoutItemAdd(workoutId: number, newWorkoutItem: WorkoutItem) {
    const newWorkoutList = data?.map((workout) => {
      if (workout.id === workoutId) {
        workout.workout_items = [...workout.workout_items, newWorkoutItem];
        return workout;
      } else {
        return workout;
      }
    });
    setData(newWorkoutList);
  }
  function handleWorkoutItemDelete(workoutId: number , workoutItemId: number){
    const newWorkoutList = data?.map((workout)=>{
      if(workout.id === workoutId){
        workout.workout_items = workout.workout_items.filter((workoutItem) => workoutItem.id !== workoutItemId)
        return workout;
      }else{
        return workout
      }
    })    
    setData(newWorkoutList)
  }

  function handleWorkoutAdd(newWorkout: WorkoutWithItems){
    setData([...data, newWorkout])
    setCreatorVisibility(false)
  }

  function handleWorkoutDelete(id: number) {
    setData(data?.filter((item) => item.id !== id));
  }
  
  return (
    <>
      {creatorVisibility && (
        <WorkoutCreator
          setVisibility={setCreatorVisibility}
          udpateUI={handleWorkoutAdd}
        />
      )}
      <div className="main__inpFlex">
        <button
          className="main__addWork"
          onClick={() => {
            setCreatorVisibility(true);
          }}
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
            onChange={(e) => {
              handleSearch(e);
            }}
          />
          <img src={searchIcon} alt="search icon" className="searchIcon" />
        </label>
      </div>
      <section className="workouts">
        {isLoading && <p>Loading...</p>}
        {Error && "Error while downloading content"}
        {search &&
          search.map((item) => {
            return (
              <WorkoutComp
                key={item.id}
                id={item.id}
                descriptive_name={item.descriptive_name}
                workout_items={item.workout_items}
                handleWorkoutItemAdd={handleWorkoutItemAdd}
              />
            );
          })}
      </section>
    </>
  );
}

export default Workouts;
