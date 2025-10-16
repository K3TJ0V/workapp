import {useEffect, useRef, useState} from 'react'
import type { WorkoutWithItems } from './utils/WorkoutWithItems';
import useFetchPost from './hooks/useFetchPost';

interface WorkoutCreatorProps {
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  udpateUI: (newItem: WorkoutWithItems) => void;
}
function WorkoutCreator({ setVisibility, udpateUI }: WorkoutCreatorProps) {
  const { returnedItem, loading, postError, setBody } = useFetchPost<WorkoutWithItems>('workouts', "8000")
  const [inputValue, setInputValue] = useState<string>("");


  const closeRef = useRef<HTMLButtonElement>(null);
  const addRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    if(postError){
      console.log(postError);
      return;
    }
    if(returnedItem !== undefined){
      const newWorkout : WorkoutWithItems = {
        id: returnedItem.id,
        descriptive_name: returnedItem.descriptive_name,
        workout_items: []
      }
      udpateUI(newWorkout);
    }
  }, [returnedItem, postError])

  function handleInputFocus(){
    if(placeholderRef.current !== null){
      placeholderRef.current.classList.add("focusedPlaceholder")
    }
  }
  function handleInputBlur(e: React.FocusEvent<HTMLInputElement, Element>){
    if(e.target.value.length !== 0){
      return
    }
    if(placeholderRef.current !== null){
      placeholderRef.current.classList.remove("focusedPlaceholder")
    }
  }
  return (
    <>
      <div className="workoutCreator-background"></div>
      <section className="workoutCreator">
        <button
          onClick={() => {
            setVisibility(false);
          }}
          className="workoutCreator__close"
          ref={closeRef}
        >
          CLOSE
        </button>
        <label htmlFor="name" className="workoutCreator__label">
          Type in workout name:
        </label>
        <div className="inputRelativePosition">
        <input
          ref={inputRef}
          onFocus={handleInputFocus}
          onBlur={(e)=>{handleInputBlur(e)}}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          type="text"
          name="name"
          id="name"
          className="workoutCreator__input"
        />
        <div ref={placeholderRef} className="inputRelativePosition__placeholder">name</div>
        </div>
        <button
          onClick={() => {
           setBody(({descriptive_name: inputValue} as WorkoutWithItems))
          }}
          className="workoutCreator__add"
          ref={addRef}
        >
          Add
        </button>
        {loading && "laduje sie"}

      </section>
    </>
  );
}

export default WorkoutCreator;