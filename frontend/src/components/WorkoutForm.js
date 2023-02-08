import { useState} from 'react'
// import useWorkoutsContext from '../hooks/useWorkoutsContext'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
const WorkoutForm = () => {
    const {dispatch} =useWorkoutsContext()
    const [title,setTitle]=useState("")
    const [load,setLoad]=useState("")
    const [reps,setreps]=useState("")
    const [error,setError]=useState(null)
    const [emptyFields,setEmptyFields] = useState([])
    const handleSubmit = async (e)=>{
      e.preventDefault()
      const workout = {title,load,reps}
      const res= await fetch("/api/workouts",{
        method:"POST",
        body: JSON.stringify(workout),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await res.json()
      if(!res.ok){
        setError(json.error)
        setEmptyFields(json.emptyFields)
      }
      if(res.ok){
        setError(null)
        setLoad("")
        setTitle("")
        setreps("")
        setEmptyFields([])
        dispatch({type:"CREATE_WORKOUT",payload:json})
      }
    }
  return (
    <form onSubmit={handleSubmit} className="create">
        <h3>Add a New Workout</h3>
        <label>Exercise Title:</label>
        <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} className={emptyFields.includes("title") ? "error" :"" } />
        <label>Load:</label>
        <input type="number" value={load} onChange={(e)=>setLoad(e.target.value)} className={emptyFields.includes("load") ? "error" :"" } />
        <label>Reps:</label>
        <input type="number" value={reps} onChange={(e)=>setreps(e.target.value)} className={emptyFields.includes("reps") ? "error" :"" } />
        <button>Add Workout</button>
        {error && <div className="error">{error}</div> }
    </form>
  )
}

export default WorkoutForm