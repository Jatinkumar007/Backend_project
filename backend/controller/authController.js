const userModel = require("../model/userSchema");
const bcrypt = require('bcrypt');

const signup=async(req,res)=>{
   try {
    const userInfo=userModel(req.body);
    const result=await userInfo.save();
    return res.status(200).json({
        success:true,
        data:result
    })
   } catch (error) {
    if(error.code===11000){
        return res.status(400).json({
            success:false,
            message:'Account already exists with provided email id'
        })
    }
    return res.status(400).json({
        success:false,
        message:error.message
    })
   }
}
const login=async(req,res)=>{
    const {username,password}=req.body;
    const loginDataValidate=await userModel.findOne({username}).select("+password");
        if(!loginDataValidate | !(await bcrypt.compare(password,loginDataValidate.password))){
            return res.status(400).json({
                success:false,
                message:'Wrong Credientials'
            })
        }
    try {
        const token = loginDataValidate.jwtToken();                       //<---- we're calling 'jwtToken' through user and user is getting by 'userModel' and 
         loginDataValidate.password=undefined;                             // userModel is getting from 'userSchema.js' file. we set password as undefined for safty
        const cookieOption={
          maxAge: 24 * 60 * 1000,
          httpOnly: true
        };
        res.cookie("token", token, cookieOption);            //<---- storing token and other details in cookie ad
        res.status(200).json({
          success: true,
          token:token,
          data:loginDataValidate
        })
    } catch (error) {
       return res.status(400).json({
        success:false,
        message:error.message
       }) 
    }
}
const home=async(req,res,next)=>{
    const userId=req.user.id;
    console.log(userId)
    try {
     const user= await userModel.findById(userId);
     return res.status(200).json({
         success:true,
         data:user
     })
    } catch (error) {
     return res.status(400).json({
         success:false,
         message:error.message
     })
    }
}
const logout=async(req,res)=>{
    try {
        const cookieOption = {
            expires: new Date(),
            httpOnly: true
        };
        res.cookie('token', null, cookieOption);
        res.status(200).json({
            success: true,
            message: "logged Out"
        })
       } catch (error) {
         res.status(400).json({
            success: false,
            message: e.message
         })
       }
}
module.exports={
    signup,
    login,
    home,
    logout
}