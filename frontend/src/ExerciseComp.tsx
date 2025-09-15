import type { Exercise } from "./utils/classes"
import Agreement from "./Agreement"
import play from './assets/play.svg'
import trash from './assets/trash.svg'
import edit from './assets/edit.svg'
import './styles/ExerciseComp.scss'
import { useState } from "react"
import ExEdit from "./ExEdit.tsx"
import { fetchDelete } from "./utils/fetchDelete.ts"


interface ExerciseProps{
    exercises: Exercise[],
    setExercises: React.Dispatch<React.SetStateAction<Exercise[]>>,
    setSearch: React.Dispatch<React.SetStateAction<Exercise[]>>
}

function ExerciseComp({exercises, setExercises, setSearch} : ExerciseProps){
    const [agreeVisibility, setAgreeVisibility] = useState<boolean>(false)
    const [deletingItemName, setDeletingItemName] = useState<string>('')
    const [editVisibility, setEditVisibility] = useState<boolean>(false)

    function handleOnDelete(name:string){
      const deleting = async () =>{
        const res = await fetchDelete(`exercises/delete/`, '8000', name)
        const data = await res
        console.log(data);
        setExercises(exercises.filter((item)=>item.name !== name))
        setSearch(exercises.filter((item)=>item.name !== name))
      }
      deleting()
    }

    return (
        <section className='main__exList'>
        {exercises.map((item)=>{
        return <article className='main__exList--exTile' key={item.id}>
            <h3 className="main__exList--exName">--- {item.name} ---</h3>
            {item.description ? 
              <fieldset className='main__exList--exDesc'>
                <legend>Description</legend>
                {item.description}
              </fieldset>
            : <p className='no-content'>No description</p>  
            }
            {item.comment ? 
            <fieldset className='main__exList--exComment'>
              <legend>Comment</legend>
                {item.comment}
            </fieldset>
            : <p className='no-content'>No comment</p> 
            }
            {item.video ? 
            <a href={item.video} target='blank' className='main__exList--exVideo'><img className='img' src={play} alt="play icon"/>  Video</a> 
            : <p className='no-content'>No video</p>
            }
            <button onClick={()=>{setEditVisibility(!editVisibility)}} className="editButton"><img src={edit} alt="edit icon" /></button>
            <button onClick={()=>{setAgreeVisibility(!agreeVisibility); setDeletingItemName(item.name)}} className="deleteButton"><img src={trash} alt="trash icon" /></button>
          </article>
        })}  
        {agreeVisibility && <Agreement onDelete={handleOnDelete} visibility={setAgreeVisibility} name={deletingItemName}/>}
        {editVisibility && <ExEdit setVisibility={setEditVisibility}/>}
      </section>
    )
}

export default ExerciseComp