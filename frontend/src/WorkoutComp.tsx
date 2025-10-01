import type { WorkoutItem } from "./utils/classes";
import './styles/WorkoutComp.scss'

interface WorkoutCompProps {
  id: number;
  descriptive_name: string | undefined;
  workout_items: WorkoutItem[];
}
function WorkoutComp({
  id,
  descriptive_name,
  workout_items,
}: WorkoutCompProps) {
  return (
    <article className="workouts__item">
      <h3 className="workouts__item--name">{descriptive_name}</h3>
      <section className="workouts__item--content">
        {workout_items.map((set) => {
          return (
            <article key={set.id} className="Set">
              <p className="Set__exName">{set.exercise}</p>
              <hr className="nameHr"/>
              <table className="Set__table">
                <thead className="Set__table--header">
                    <tr>
                      <th className="Set__table--header--tile">Set</th>
                      {set.weight && <th className="Set__table--header--tile">weight</th>}
                      {set.time && <th className="Set__table--header--tile">time</th>}
                      {set.reps && <th className="Set__table--header--tile">reps</th>}
                      {set.tempo && <th className="Set__table--header--tile">tempo</th>}
                      {set.rir && <th className="Set__table--header--tile">rir</th>}
                    </tr>
                </thead>
                <tbody className="Set__table--body">
                    {renderSets(set.sets, set.weight, set.reps, set.time, set.tempo, set.rir)}
                </tbody>
              </table>
              <hr className="Set__hr" />
            </article>
          );
        })}
      </section>
    </article>
  );
}
function renderSets(
  sets: number,
  weight?: number,
  reps?: number,
  time?: number,
  tempo?: string,
  rir?: string
) {
  const setsList = [];
  for (let i = 0; i < sets; i++) {
    setsList.push(
        <tr key={i}>
            <td className="Set__table--body--tile">{i+1}</td>
            {weight && <td className="Set__table--body--tile">{weight}</td>}
            {time && <td className="Set__table--body--tile">{time}</td>}
            {reps && <td className="Set__table--body--tile">{reps}</td>}
            {tempo && <td className="Set__table--body--tile">{tempo}</td>}
            {rir && <td className="Set__table--body--tile">{rir}</td>}
        </tr>
    );
  }
  return setsList;
}

export default WorkoutComp;
