import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
const WorkoutForm=()=>{
    const {dispatch}=useWorkoutsContext()
    const[title,setTitle]=new useState('')
    const[load,setLoad]=new useState('')
    const[reps,setReps]=new useState('')
    const[error,setError]=new useState(null)
    const[emptyfields,setemptyfields]=new useState([])
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const workout={title,load,reps}
        const response=await fetch('/api/workouts',{
            method:'POST',
            body:JSON.stringify(workout),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const json=await response.json()
        if(!(response.ok))
        {
            setError(json.error)
            setemptyfields(json.emptyfields)
        }
        if(response.ok)
        {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            setemptyfields([])
            console.log("new workout added")
            dispatch({type:'CREATE_WORKOUTS',payload:json})
        }
    }
    return(
        <form  className="create" onSubmit={handleSubmit}>
        <h3>Enter the new Workout</h3>

        <label>Enter the Workout</label>
        <input type="text" onChange={(e)=>{setTitle(e.target.value) 
        }} value={title}
        className={emptyfields.includes('title') ? 'error':''}/>

        <label>Enter the load</label>
        <input type="number" onChange={(e)=>{setLoad(e.target.value) 
        }} value={load}
        className={emptyfields.includes('load') ? 'error':''}/>

        <label>Enter the Reps</label>
        <input type="number" onChange={(e)=>{setReps(e.target.value) 
        }} value={reps}
        className={emptyfields.includes('reps') ? 'error':''}/>
        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}
        </form>
    )
}
export default WorkoutForm