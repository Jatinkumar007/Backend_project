const mongoose=require('mongoose');
const {Schema}=mongoose;
const JWT=require('jsonwebtoken');
const bcrypt=require('bcrypt');

const userSchema= new Schema({
    name:{
        type:String,
        required: [true, 'use name is Required'],
        minLength: [5, 'Name must be at least 5 char'],
        maxLength: [20, 'Name must me less than 20 char'],
        trim: true
    },
    username:{
        type:String,
        required: [true, 'Username must be required'],
        trim: true
    },
    bio:{
        type:String,
        required: [true, 'Bio must be required'],
        trim: true
    },
    email:{
        type:String,
        required: [true, 'Email must be required'],
        unique: [true, 'already registered'],
        lowercase: true
    },
    password:{
        type: String,
        select: false
    },
    forgetPasswordToken:{
        type:String
    },
    forgetPasswordExpiryDate:{
        type: Date
    }
},{
    timestamps: true
})
userSchema.pre('save', async function(next){                                          //<----- add 'userSchema.pre'
    try {
      if(!this.isModified('password')){
        return next();
      }
      this.password = await bcrypt.hash(this.password, 10);
      return next();
    } catch (error) {
      return next(error);
    }
  })
userSchema.methods={
    jwtToken(){
        return JWT.sign(
            {id: this._id,email: this.email},
            process.env.SECRET,
            {expiresIn: '24h'}
        )
    }
}
const userModule=mongoose.model('user',userSchema);
module.exports=userModule;