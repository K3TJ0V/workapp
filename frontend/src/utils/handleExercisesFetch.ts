import { Exercise } from "./classes";

export function handleExercisesFetch(fetchedData: Exercise[]) {
  const result: Exercise[] = [];
  if (fetchedData) {
    fetchedData.forEach((item: Exercise) => {
      const newEx = new Exercise(
        item.id,
        item.name,
        item.description,
        item.video,
        item.comment
      );
      result.push(newEx);
    });
    return result
  } else if (Error) {
    console.log(Error);
  }
}
