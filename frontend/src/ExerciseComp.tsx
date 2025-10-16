import type { Exercise } from "./utils/classes";
import play from "./assets/play.svg";
import trash from "./assets/trash.svg";
import edit from "./assets/edit.svg";
import "./styles/ExerciseComp.scss";
import { useState } from "react";
import ExEdit from "./ExEdit.tsx";

interface ExerciseProps {
  exercises: Exercise[];
  setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>;
  setSearch: React.Dispatch<React.SetStateAction<Exercise[]>>;
}

function ExerciseComp({ exercises, setExercises, setSearch }: ExerciseProps) {
  const [modifiedItem, setModifiedItem] = useState<Exercise>();
  const [editVisibility, setEditVisibility] = useState<boolean>(false);

  return (
    <section className="main__exList">
      {exercises.map((item) => {
        return (
          <article className="main__exList--exTile" key={item.id}>
            <h3 className="main__exList--exName">--- {item.name} ---</h3>
            {item.description ? (
              <fieldset className="main__exList--exDesc">
                <legend>Description</legend>
                {item.description}
              </fieldset>
            ) : (
              <p className="no-content">No description</p>
            )}
            {item.comment ? (
              <fieldset className="main__exList--exComment">
                <legend>Comment</legend>
                {item.comment}
              </fieldset>
            ) : (
              <p className="no-content">No comment</p>
            )}
            {item.video ? (
              <a
                href={item.video}
                target="blank"
                className="main__exList--exVideo"
              >
                <img className="img" src={play} alt="play icon" /> Video
              </a>
            ) : (
              <p className="no-content">No video</p>
            )}
            <button
              onClick={() => {
                setModifiedItem(item);
                setEditVisibility(!editVisibility);
              }}
              className="editButton"
            >
              <img src={edit} alt="edit icon" />
            </button>
            <button onClick={() => {}} className="deleteButton">
              <img src={trash} alt="trash icon" />
            </button>
          </article>
        );
      })}
      {editVisibility && (
        <ExEdit item={modifiedItem} setVisibility={setEditVisibility} />
      )}
    </section>
  );
}

export default ExerciseComp;
