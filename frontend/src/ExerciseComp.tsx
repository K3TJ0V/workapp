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
    const [modifiedItem, setModifiedItem] = useState<Exercise>()
    const [editVisibility, setEditVisibility] = useState<boolean>(false)

    function handleOnDelete(name:string | undefined){
      const deleting = async () =>{
        if(!name){
          return "ERROR: name is not declared"
        }
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
            <button onClick={()=>{setModifiedItem(item); setEditVisibility(!editVisibility)}} className="editButton"><img src={edit} alt="edit icon" /></button>
            <button onClick={()=>{setModifiedItem(item); setAgreeVisibility(!agreeVisibility)}} className="deleteButton"><img src={trash} alt="trash icon" /></button>
          </article>
        })}  
        {agreeVisibility && <Agreement onDelete={handleOnDelete} visibility={setAgreeVisibility} name={modifiedItem?.name}/>}
        {editVisibility && <ExEdit item={modifiedItem} setVisibility={setEditVisibility}/>}
      </section>
    )
}

export default ExerciseComp