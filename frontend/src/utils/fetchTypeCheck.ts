import type { Exercise } from "./classes";
import type { WorkoutWithItems } from "./WorkoutWithItems";

export function fetchTypeCheck<T>(fetchedData: T[]) {
  if (fetchedData.length === 0) {
    return "empty";
  } else if (
    (fetchedData as WorkoutWithItems[])[0].workout_items !== undefined
  ) {
    return "WorkoutWithItems";
  } else if ((fetchedData as Exercise[])[0].comment !== undefined) {
    return "Exercise";
  }
}