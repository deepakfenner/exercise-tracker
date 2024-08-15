const User=require('../models/usermodels');
const jwt=require('jsonwebtoken');
require('dotenv').config();

//function to create jsonwebtoken
const webtoken=(_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'})
}


const userlogin=async(req,res)=>{
    const{email,password}=req.body;
    try{
        const user=await User.login({email,password});
        //create a token
        const token=webtoken(user._id);
        res.status(200).json({email,token})
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

const usersignup=async(req,res)=>{
    const{email,password}=req.body;
    try{
        const user=await User.signup({email,password});
        //create a token
        const token=webtoken(user._id);
        res.status(200).json({email,token})
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

module.exports={userlogin,usersignup};