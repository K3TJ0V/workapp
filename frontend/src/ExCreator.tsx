import { useEffect, useRef } from "react";
import "./styles/ExCreator.scss";
import { Exercise } from "./utils/classes";
import useFetchPost from "./hooks/useFetchPost";
import { validateExerciseForm } from "./utils/vallidateExerciseForm";

interface ExCreatorProps {
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  handleExAdd: (ex: Exercise) => void;
}

function ExCreator({ setVisibility, handleExAdd }: ExCreatorProps) {
  const { returnedItem, loading, postError, setBody } = useFetchPost<Exercise>(
    "exercises",
    "8000"
  );
  const submitRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (postError) {
      console.log(postError);
    }
    if (returnedItem !== undefined) {
      const newEx = new Exercise(
        returnedItem.id,
        returnedItem.name,
        returnedItem?.description,
        returnedItem?.video,
        returnedItem?.comment
      );
      handleExAdd(newEx);
    }
  }, [returnedItem, postError]);

  function handleOnSubmit(formData: FormData) {
    const validatedData = validateExerciseForm(formData);
    setBody(validatedData as Exercise);
  }

  return (
    <>
      <section className="main__creator">
        <div className="close-flex">
          <button
            ref={closeRef}
            onClick={() => setVisibility(false)}
            className="main__creator--close"
          >
            CLOSE
          </button>
        </div>
        <article className="window">
          <h3 className="window__title">New Exercise</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleOnSubmit(new FormData(e.currentTarget));
            }}
          >
            <label className="label-flex" htmlFor="name">
              Name:
              <input
                className="window__input"
                placeholder="eg. OHP"
                type="text"
                name="name"
                id="name"
                required
              />
            </label>
            <label className="label-flex" htmlFor="description">
              Description:
              <textarea
                className="window__input"
                rows={8}
                placeholder="description"
                name="description"
                id="description"
              />
            </label>
            <label className="label-flex" htmlFor="video">
              Video:
              <input
                className="window__input"
                placeholder="https://....."
                type="url"
                name="video"
                id="video"
              />
            </label>
            <label className="label-flex" htmlFor="comment">
              Comment:
              <textarea
                className="window__input"
                rows={3}
                placeholder="comment"
                name="comment"
                id="comment"
              />
            </label>
            <button ref={submitRef} type="submit" className="window__create">
              Create
            </button>
            {loading && "ladujemy"}
          </form>
        </article>
      </section>
    </>
  );
}

export default ExCreator;
