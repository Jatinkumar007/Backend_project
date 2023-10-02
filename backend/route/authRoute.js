const express=require('express');
const {home,signup,login,logout}=require('../controller/authController');
const signupDataValidate=require('../middleware/signupDataValidate');
const loginDataValidate=require('../middleware/loginDataValidate');
const authenticateUser=require('../middleware/authenticateUser');

const authRouter=express.Router();

authRouter.post('/signup',signupDataValidate,signup);
authRouter.post('/login',loginDataValidate,login);
authRouter.get('/',authenticateUser,home);
authRouter.get('/logout',logout);

module.exports=authRouter;