import {useRef, useState} from 'react'

interface WorkoutCreatorProps {
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  handleOnAdd: (name: string) => void;
}
function WorkoutCreator({ setVisibility, handleOnAdd }: WorkoutCreatorProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const closeRef = useRef<HTMLButtonElement>(null);
  const addRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null)

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
          onClick={async () => {
            if(!closeRef.current || !addRef.current || !inputRef.current){
              return
            }
            closeRef.current.setAttribute("disabled", "")
            addRef.current.setAttribute("disabled", "")
            inputRef.current.setAttribute("disabled", "")
            await handleOnAdd(inputValue.trim());
          }}
          className="workoutCreator__add"
          ref={addRef}
        >
          Add
        </button>
      </section>
    </>
  );
}

export default WorkoutCreator;