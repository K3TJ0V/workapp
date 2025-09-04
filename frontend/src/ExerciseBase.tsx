import { useEffect, useState } from 'react'
import './styles/ExerciseBase.scss'
import useFetchGet from './utils/useFetchGet'
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
    }
    setExercises(result)
  }, [data])

  return (
    <>
      {isLoading && <p>Loading....</p>}
      {Error && console.log(Error)}
      {data && 
      <section className='main__exList'>
        {exercises.map((item)=>{
        return <article className='main__exList--exTile' key={item.id}>{item.id}, {item.name}</article>
        })}  
      </section>}
    </>
  )
}

export default ExerciseBase
