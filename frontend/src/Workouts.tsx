import { useEffect, useState } from "react";
import "./styles/Workouts.scss";
import { WorkoutItem } from "./utils/classes";
import WorkoutComp from "./WorkoutComp";
import useFetchGet from "./hooks/useFetchGet";
import searchIcon from "./assets/search.svg";
import fetchPost from "./fetchers/fetchPost.ts";
import type { popupData } from "./utils/popupData";
import Popup from "./Popup.tsx";
import patternSearch from "./utils/patternSearch.ts";
import WorkoutCreator from "./WorkoutCreator.tsx";
import type { WorkoutWithItems } from "./utils/WorkoutWithItems.ts";

function Workouts() {
  const { data, setData, isLoading, Error } = useFetchGet<WorkoutWithItems>("workouts", "8000");
  const [search, setSearch] = useState<WorkoutWithItems[]>([]);
  const [creatorVisibility, setCreatorVisibility] = useState<boolean>(false);
  const [popupData, setPopupData] = useState<popupData>();
  const [popup, setPopup] = useState(false);

  useEffect(()=>{
    if(data){
      setSearch(data)
    }
  }, [data])

  function handlePopup(content: string, result: "message" | "error") {
    setPopupData({ content: content, result: result });
    setPopup(true);
    setTimeout(() => {
      setPopup(false);
    }, 2100);
  }

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
    setSearch(newWorkoutList)
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
    setSearch(newWorkoutList)
  }

  async function handleWorkoutAdd(name: string) {
    if (!name) return;
    let newWorkout: WorkoutWithItems = {
      id: -1,
      descriptive_name: name,
      workout_items: [],
    };
    const [id, result] = await fetchPost("workouts/", "8000", {
      descriptive_name: name,
    });
    if (result.error) {
      handlePopup(result.error, "error");
      return;
    }
    newWorkout.id = id;
    handlePopup(result.message, "message");
    if (data) {
      setData([...data, newWorkout]);
      setSearch([...data, newWorkout]);
    } else {
      setData([newWorkout]);
      setSearch([newWorkout]);
    }
    setCreatorVisibility(false);
  }
  function handleWorkoutDelete(id: number) {
    setData(data?.filter((item) => item.id !== id));
    setSearch(data);
  }
  return (
    <>
      {popup && popupData && (
        <Popup content={popupData.content} result={popupData.result} />
      )}
      {creatorVisibility && (
        <WorkoutCreator
          handleOnAdd={handleWorkoutAdd}
          setVisibility={setCreatorVisibility}
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
                handleUiUpdate={handleWorkoutDelete}
                showPopup={handlePopup}
                handleWorkoutItemAdd={handleWorkoutItemAdd}
                handleWorkoutItemDeletion={handleWorkoutItemDelete}
              />
            );
          })}
      </section>
    </>
  );
}

export default Workouts;
