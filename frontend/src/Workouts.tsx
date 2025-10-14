import { useEffect, useState } from "react";
import "./styles/Workouts.scss";
import { WorkoutItem } from "./utils/classes";
import WorkoutComp from "./WorkoutComp";
import useFetchGet from "./hooks/useFetchGet";
import searchIcon from "./assets/search.svg";
import fetchPost from "./utils/fetchPost";
import type { popupData } from "./utils/popupData";
import Popup from "./Popup.tsx";
import patternSearch from "./utils/patternSearch.ts";
import WorkoutCreator from "./WorkoutCreator.tsx";

interface WorkoutWithItems {
  id: number;
  descriptive_name: string;
  workout_items: WorkoutItem[];
}

function Workouts() {
  const { data, isLoading, Error } = useFetchGet("creator/workouts", "8000");
  const [workouts, setWorkouts] = useState<WorkoutWithItems[]>();
  const [searchBackup, setSearchBackup] = useState<WorkoutWithItems[]>();
  const [creatorVisibility, setCreatorVisibility] = useState<boolean>(false);
  const [popupData, setPopupData] = useState<popupData>();
  const [popup, setPopup] = useState(false);

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
      setSearchBackup(fetchedWorkouts);
    }
  }, [data]);
  function handlePopup(content: string, result: "message" | "error") {
    setPopupData({ content: content, result: result });
    setPopup(true);
    setTimeout(() => {
      setPopup(false);
    }, 2100);
  }
  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value.trim() === "") {
      setWorkouts(searchBackup);
      return;
    }
    setWorkouts(
      searchBackup?.filter((item) =>
        patternSearch(e.target.value.trim(), item.descriptive_name)
      )
    );
  }
  function handleWorkoutItemAdd(workId: number, newWorkoutItem: WorkoutItem) {
    const newWorkoutList = workouts?.map((workout) => {
      if (workout.id === workId) {
        workout.workout_items = [...workout.workout_items, newWorkoutItem];
        return workout;
      } else {
        return workout;
      }
    });
    setWorkouts(newWorkoutList);
  }
  function handleWorkoutItemDelete(){
    
  }

  async function handleWorkoutAdd(name: string) {
    if (!name) return;
    let newWorkout: WorkoutWithItems = {
      id: -1,
      descriptive_name: name,
      workout_items: [],
    };
    const [id, result] = await fetchPost("creator/workouts", "8000", {
      descriptive_name: name,
    });
    if (result.error) {
      handlePopup(result.error, "error");
      return;
    }
    newWorkout.id = id;
    handlePopup(result.message, "message");
    if (workouts) {
      setWorkouts([...workouts, newWorkout]);
      setSearchBackup([...workouts, newWorkout]);
    } else {
      setWorkouts([newWorkout]);
      setSearchBackup([newWorkout]);
    }
    setCreatorVisibility(false);
  }
  function handleWorkoutDelete(id: number) {
    setWorkouts(workouts?.filter((item) => item.id !== id));
    setSearchBackup(workouts);
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
        {workouts &&
          workouts.map((item) => {
            return (
              <WorkoutComp
                key={item.id}
                id={item.id}
                descriptive_name={item.descriptive_name}
                workout_items={item.workout_items}
                handleUiUpdate={handleWorkoutDelete}
                showPopup={handlePopup}
                handleWorkoutItemAdd={handleWorkoutItemAdd}
              />
            );
          })}
      </section>
    </>
  );
}

export default Workouts;
