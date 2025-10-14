import fetchPost from "../fetchers/fetchPost";
import { WorkoutItem } from "./classes";

interface PostBody {
  exercise: string;
  sets: number;
  workout: number;
  weight?: number;
  reps?: number;
  time?: number;
  tempo?: string;
  rir?: string;
}
export async function validateWorkoutItemFormAndFetch(items:FormData, workoutId: number) {
    let fetchData: PostBody = {
      exercise: "",
      sets: 0,
      workout: 0,
    };
    fetchData.workout = workoutId;
    fetchData.exercise = String(items.get("exercise"));
    fetchData.sets = parseInt(String(items.get("sets")));
    if(!fetchData.exercise || !fetchData.sets || !fetchData.workout){
      console.log("wrong form");
      return
    }
    items.get("weight")
      ? (fetchData.weight = parseInt(String(items.get("weight"))))
      : null;
    items.get("reps")
      ? (fetchData.reps = parseInt(String(items.get("reps"))))
      : null;
    items.get("time")
      ? (fetchData.time = parseInt(String(items.get("time"))))
      : null;
    items.get("tempo") ? (fetchData.tempo = String(items.get("tempo"))) : null;
    items.get("rir") ? (fetchData.rir = String(items.get("rir"))) : null;
    const [id] = await fetchPost(
      "creator/work-item",
      "8000",
      fetchData
    );
    const newWorkoutItem = new WorkoutItem(
      id,
      fetchData.sets,
      fetchData.exercise,
      fetchData.workout,
      fetchData.weight,
      fetchData.reps,
      fetchData.time,
      fetchData.tempo,
      fetchData.rir
    );
    return newWorkoutItem;
}