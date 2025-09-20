import { useEffect, useState, type ChangeEvent } from 'react'
import './styles/ExerciseBase.scss'
import useFetchGet from './hooks/useFetchGet'
import searchIcon from './assets/search.svg'
import { Exercise } from './utils/classes'
import ExerciseComp from './ExerciseComp'
import patternSearch from './utils/patternSearch'
import ExCreator from './ExCreator'

function ExerciseBase() {
  const {data, isLoading, Error} = useFetchGet('creator/exercises', '8000')
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [search, setSearch] = useState<Exercise[]>([])
  const [creaotrVisibility, setCreaotrVisibility] = useState(false)

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
    setSearch(result)
  }, [data])

  function handleExAdd(newEx:Exercise){
    setExercises([...exercises, newEx])
    setSearch([...search, newEx])
  }

  function handleOnChange(e:ChangeEvent<HTMLInputElement>){
    const pattern = e.target.value
    setSearch(exercises.filter((ex)=> patternSearch(pattern, ex.name)))    
  }
  
  return (
    <>
      <div className='main__inpFlex'>
      <button onClick={()=>setCreaotrVisibility(!creaotrVisibility)} className='main__addEx'><p className='highlight'>+</p><br/>Add new exercise</button>
      <label htmlFor="search" className='search-label'>
        <input onChange={event=>{handleOnChange(event)}} className='main__searchBar' type="text" name="search" id="search" placeholder='Eg. Bench press' />
        <img src={searchIcon} alt="search icon" className='searchIcon'/>
      </label>
      </div>
      {isLoading && <p>Loading....</p>}
      {data && <ExerciseComp setSearch={setSearch} setExercises={setExercises} exercises={search}/>}
      {creaotrVisibility && <ExCreator handleExAdd={handleExAdd} setVisibility={setCreaotrVisibility}/>}
    </>
  )
}

export default ExerciseBase
