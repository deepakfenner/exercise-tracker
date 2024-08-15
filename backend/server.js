require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const workoutroutes=require('./routes/workouts')
const userroutes=require('./routes/user')
const app=express()
//middleware
app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})
//mongodb connection
mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("server is listening successfully",process.env.PORT);
})
}).catch((error)=>{
    console.log(error)
})
//path in which the routes can be accessed
app.use('/api/workouts',workoutroutes)

app.use('/api/user',userroutes)

