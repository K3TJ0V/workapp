import { useEffect, useState } from "react";
import "./styles/WorkoutItemCreator.scss";
import { fetchExIdAndName } from "./fetchers/fetchExIdAndName";
import type { IdAndName } from "./utils/ExIdAndName";
import { WorkoutItem } from "./utils/classes";
import { validateWorkoutItemFormAndFetch } from "./utils/validateWorkoutItemForm";

interface WorkoutItemCreatorProps {
  workoutId: number;
  visibilitySetter: React.Dispatch<React.SetStateAction<boolean>>;
  handleWorkoutItemAdd: (workId: number, newItem: WorkoutItem) => void;
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
    // validate and perform fetch
    const validatedWorkoutItem = await validateWorkoutItemFormAndFetch(items, workoutId)
    if(validatedWorkoutItem){
      handleWorkoutItemAdd(workoutId, validatedWorkoutItem);
    }
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

