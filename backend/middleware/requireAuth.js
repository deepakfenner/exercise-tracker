const jwt=require('jsonwebtoken')
require('dotenv').config()
const User=require('../models/usermodels')
const requireAuth = async(req, res, next) =>{
    const{authorization}=req.headers;
    if(!authorization){
        return res.status(401).json({error:'Authorization token not found'})
    }
    const token=authorization.split(' ')[1]
    try{
        const{_id}=jwt.verify(token,process.env.SECRET);
        req.user=await User.findOne({_id}).select('_id')
        next()
    }
    catch(error){
        return res.status(401).json({error:'Invalid token'})
    }
}  

module.exports=requireAuth;