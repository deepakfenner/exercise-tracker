import { useState } from "react"

const WorkoutForm=()=>{
    const[title,setTitle]=new useState('')
    const[load,setLoad]=new useState('')
    const[reps,setReps]=new useState('')
    const[error,setError]=new useState(null)
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
        }
        if(response.ok)
        {
            setTitle('')
            setLoad('')
            setReps('')
            setError(null)
            console.log("new workout added")
        }
    }
    return(
        <form  className="create" onSubmit={handleSubmit}>
        <h3>Enter the new Workout</h3>

        <label>Enter the Workout</label>
        <input type="text" onChange={(e)=>{setTitle(e.target.value) 
        }} value={title}/>

        <label>Enter the load</label>
        <input type="number" onChange={(e)=>{setLoad(e.target.value) 
        }} value={load}/>

        <label>Enter the Reps</label>
        <input type="number" onChange={(e)=>{setReps(e.target.value) 
        }} value={reps}/>
        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}
        </form>
    )
}
export default WorkoutForm