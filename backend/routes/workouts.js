const express=require('express')
//importing the function to handle the routes
const{createworkout,getworkouts,getworkout,deleteworkout,updateworkout}=require('../controllers/workoutcontroller')
const requireAuth=require('../middleware/requireAuth')
const router=express.Router();
router.use(requireAuth)
//get all the workouts
router.get("/",getworkouts)
//get a single workout
router.get("/:id",getworkout)
//post a single workout
router.post("/",createworkout)

//delete a workout
router.delete("/:id",deleteworkout)
//updating a workout
router.patch("/:id",updateworkout)

module.exports=router