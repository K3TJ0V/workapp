import { useEffect, useState } from 'react'
import './styles/ExerciseBase.scss'
import useFetchGet from './utils/useFetchGet'
import play from './assets/play.svg'
import searchIcon from './assets/search.svg'
import { Exercise } from './utils/classes'

function ExerciseBase() {
  const {data, isLoading, Error} = useFetchGet('creator/exercises', '8000')
  const [exercises, setExercises] = useState<Exercise[]>([])
  useEffect(()=>{
    const result:Exercise[] = []
    if(data){
      data.forEach((item:Exercise)=>{
        const newEx = new Exercise(item.id, item.name, item.description, item.video, item.comment)
        result.push(newEx)
      })
    }else if(Error){
      console.log(Error);
    }
    setExercises(result)
  }, [data])

  return (
    <>
      <button className='main__addEx'><p className='highlight'>+</p><br/>Add new exercise</button>
      <label htmlFor="search" className='search-label'>
        <input className='main__searchBar' type="text" name="search" id="search" placeholder='Eg. Bench press' />
        <img src={searchIcon} alt="search icon" className='searchIcon'/>
      </label>
      {isLoading && <p>Loading....</p>}
      {data && 
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
      </section>}
    </>
  )
}

export default ExerciseBase
