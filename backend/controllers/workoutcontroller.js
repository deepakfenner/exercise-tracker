const Workout=require('../models/workoutmodels')
const mongoose=require('mongoose')
//get all workouts
const getworkouts=(async(req,res)=>{
    const user_id=req.user._id;
    const workouts=await Workout.find({user_id}).sort({createdAt:-1})
    res.status(200).json(workouts)  
})


//get a single workout
const getworkout=(async(req,res)=>{
    const{id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error:'no such workout found'})
    }
    else{
    const workout=await Workout.findById(id)
    if(!workout)
    {
        return res.status(404).json({error:'Workout not found'})
    }
    res.status(200).json(workout)
}
})



//create a new workout(post)
const createworkout=(async(req,res)=>{
    const{title,load,reps}=req.body

    let emptyfields=[];
    if(!title)
    {
        emptyfields.push(title);
    }
    if(!load)
    {
        emptyfields.push(load);
    }
    if(!reps)
    {
        emptyfields.push(reps);
    }
    if(emptyfields.length>0)
    {
        return res.status(400).json({error:'Please fill all the details',emptyfields});
    }
    try{
        //storing collection to db using model(the collection is called "workout")
        const user_id=req.user._id;
        const workout=await Workout.create({title,load,reps,user_id})
        res.status(200).json(workout)

    }catch(error)
    {
        res.status(400).json({error:error.message})
    }
})

//delete a single workout
const deleteworkout=(async(req,res)=>{
    const{id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error:'no id found'})
    }
    const workout=await Workout.findOneAndDelete({_id:id})
    if(!workout)
    {
        return res.status(404).json({error:'no workout found'})
    }
    res.status(200).json(workout)
})


//update a workout(patch)
const updateworkout=(async(req,res)=>{
    const{id}=req.params
    if(!mongoose.Types.ObjectId.isValid(id))
    {
        return res.status(404).json({error:'no id found'})
    }
    const workout=await Workout.findOneAndUpdate({_id:id},{...req.body})
    if(!workout)
    {
        return res.status(404).json({error:'no workout found'})
    }
    res.status(200).json(workout)
})



//exporting the function to handle routes

module.exports={
    createworkout,getworkouts,getworkout,deleteworkout,updateworkout
}