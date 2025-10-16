import  { WorkoutItem } from "./classes";
import type { WorkoutWithItems } from "./WorkoutWithItems";

export function handleWorkoutWithItems(fetchedItems: WorkoutWithItems[]){
    if (fetchedItems) {
          let fetchedWorkouts: WorkoutWithItems[] = [];
          fetchedItems.forEach((work: WorkoutWithItems) => {
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
          return fetchedWorkouts;
    }
}