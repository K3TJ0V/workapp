import { useEffect, useState } from "react";
import "./styles/WorkoutItemCreator.scss";
import { fetchExIdAndName } from "./utils/fetchExIdAndName";
import type { IdAndName } from "./utils/ExIdAndName";
import fetchPost from "./utils/fetchPost";
import { WorkoutItem } from "./utils/classes";

interface WorkoutItemCreatorProps {
  workoutId: number;
  visibilitySetter: React.Dispatch<React.SetStateAction<boolean>>;
  handleWorkoutItemAdd: (workId: number, newItem: WorkoutItem) => void;
}
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
function WorkoutItemCreator({
  workoutId,
  visibilitySetter,
  handleWorkoutItemAdd,
}: WorkoutItemCreatorProps) {
  const [exList, setExList] = useState<IdAndName[]>([]);
  useEffect(() => {
    const fetchExes = async () => {
      const data = await fetchExIdAndName();
      if (!data.error && typeof data.data !== "string") {
        setExList(data.data);
      } else {
        console.log(data.data);
      }
    };
    fetchExes();
  }, []);
  async function handleFormSubmit(items: FormData) {
    let fetchData: PostBody = {
      exercise: "",
      sets: 0,
      workout: 0,
    };
    fetchData.workout = workoutId;
    fetchData.exercise = String(items.get("exercise"));
    fetchData.sets = parseInt(String(items.get("sets")));
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
    const [id, result] = await fetchPost(
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
    handleWorkoutItemAdd(workoutId, newWorkoutItem);
  }
  return (
    <div className="workoutItemCreator">
      <section className="workoutItemCreator__window">
        test
        <button
          onClick={() => {
            visibilitySetter(false);
          }}
          className="workoutItemCreator__close"
        >
          CLOSE
        </button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFormSubmit(new FormData(e.currentTarget));
          }}
          className="workoutItemForm"
        >
          <label htmlFor="exercise">exercise: </label>
          <select name="exercise" id="exercise" required>
            <option></option>
            {exList.map((ex) => (
              <option value={ex.name}>{ex.name}</option>
            ))}
          </select>
          <label htmlFor="sets">Sets: </label>
          <input type="number" name="sets" id="sets" required />

          <label htmlFor="weight">Weight: </label>
          <input
            type="number"
            name="weight"
            id="weight"
            placeholder="optional"
          />

          <label htmlFor="reps">Reps: </label>
          <input type="number" name="reps" id="reps" placeholder="optional" />

          <label htmlFor="time">Time: </label>
          <input type="number" name="time" id="time" placeholder="optional" />

          <label htmlFor="tempo">Tempo: </label>
          <input
            type="text"
            maxLength={4}
            name="tempo"
            id="tempo"
            placeholder="optional"
          />

          <label htmlFor="rir">Rir: </label>
          <input
            type="text"
            maxLength={3}
            name="rir"
            id="rir"
            placeholder="optional"
          />
          <button type="submit">Add</button>
        </form>
      </section>
    </div>
  );
}

export default WorkoutItemCreator;
//     sets: number;
//     exercise: string;
//     workout: number;
//     weight: number | undefined;
//     reps: number | undefined;
//     time: number | undefined;
//     private _tempo: string | undefined;
//     private _rir : string | undefined;
