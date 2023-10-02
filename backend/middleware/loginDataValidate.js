const loginDataValidate=(req,res,next)=>{
    const {username,password}=req.body;
    console.log(username,password);
    if(!username || !password){
        return res.status(400).json({
            success:false,
            message:"Every field is required"
        })
    }
    else{
        return next()
    }
}
module.exports=loginDataValidate