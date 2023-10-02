const emailValidator=require('email-validator');
const signupDataValidate=(req,res,next)=>{
    const {name,username,bio,email,password}=req.body;
    console.log(name,username,bio,email,password);
    if(!name || !username || !bio || !email || !password){
        return res.status(400).json({
            success:false,
            message:"Every filed is required"
        })
    }
    const check=emailValidator.validate(email);
    if(!check){
        return res.status(400).json({
            success:false,
            message:"Please Provide a Valid Email ID"
        })
    }
    else{
        return next()
    }
}
module.exports=signupDataValidate;