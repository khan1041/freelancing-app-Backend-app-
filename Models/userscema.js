import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import validator from "validator";
import Dotenv from "dotenv"
Dotenv.config()
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
   // validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    //select: false,

  },
 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


userSchema.methods.generateToken=function(){

 try {
  return jwt.sign({

   userId:this._id.toString(),
   email:this.email,
  // isAdmin:this.isAdmin

  },
  
process.env.JWT_SECRECT_KEY,
{
  expiresIn:"30d"
}

)
 } catch (error) {
  console.log(error)
 }

}

export const User = mongoose.model("User", userSchema);