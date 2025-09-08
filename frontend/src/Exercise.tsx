import type { Exercise } from "./utils/classes"
import play from './assets/play.svg'
import './styles/ExerciseComp.scss'


interface ExerciseProps{
    exercises: Exercise[] 
}

function ExerciseComp({exercises} : ExerciseProps){
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
            : <p className='no-content'>No description</p> 
            }
            {item.video ? 
            <a href={item.video} target='blank' className='main__exList--exVideo'><img className='img' src={play} alt="play icon"/>  Video</a> 
            : <p className='no-content'>No video</p>
            }
          </article>
        })}  
      </section>
    )
}

export default ExerciseComp