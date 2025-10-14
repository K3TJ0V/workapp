import "./styles/WorkoutSetComp.scss";
import type { WorkoutItem } from "./utils/classes";
import edit from "./assets/edit.svg";
import trash from "./assets/trash.svg";

interface WorkoutItemCompProps {
  workoutItem: WorkoutItem;
}

function WorkoutItemComp({
  workoutItem
}: WorkoutItemCompProps) {

  return (
    <>
      <article key={workoutItem.id} className="Set">
        <div className="ex-header-flex">
          <p className="Set__exName">{workoutItem.exercise}</p>
          <button>
            <img src={edit} alt="edit-icon" />
          </button>
          <button onClick={()=>{}}>
            <img src={trash} alt="delete-icon" />
          </button>
        </div>
        <hr className="nameHr" />
        <table className="Set__table">
          <thead className="Set__table--header">
            <tr>
              <th className="Set__table--header--tile">Set</th>
              {workoutItem.weight && (
                <th className="Set__table--header--tile">weight</th>
              )}
              {workoutItem.time && (
                <th className="Set__table--header--tile">time</th>
              )}
              {workoutItem.reps && (
                <th className="Set__table--header--tile">reps</th>
              )}
              {workoutItem.tempo && (
                <th className="Set__table--header--tile">tempo</th>
              )}
              {workoutItem.rir && (
                <th className="Set__table--header--tile">rir</th>
              )}
            </tr>
          </thead>
          <tbody className="Set__table--body">
            {renderSets(
              workoutItem.sets,
              workoutItem.weight,
              workoutItem.reps,
              workoutItem.time,
              workoutItem.tempo,
              workoutItem.rir
            )}
          </tbody>
        </table>
        <hr className="Set__hr" />
      </article>
    </>
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
        <td className="Set__table--body--tile">{i + 1}</td>
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

export default WorkoutItemComp;
