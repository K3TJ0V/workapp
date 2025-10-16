import type { WorkoutItem } from "./classes";

export interface WorkoutWithItems {
  id: number;
  descriptive_name: string;
  workout_items: WorkoutItem[];
}