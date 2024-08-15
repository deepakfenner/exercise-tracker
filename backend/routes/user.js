const express = require('express');
const router = express.Router();
//importing the controllers for signup and login
const{userlogin,usersignup}=require('../controllers/usercontroller')
//login route
router.post('/login',userlogin);



//signup route
router.post('/signup',usersignup);


module.exports = router;