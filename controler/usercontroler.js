
import { User } from "../Models/Uservalid.js";
import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcryptjs";
//import createTokenAndSaveCookies from "../jwt/Authtoken.js";

export const register = async (req, res) => {

    // if (!req.files || Object.keys(req.files).length === 0) {
    //   return res.status(400).json({ message: "User photo is required" });
    // }
    // const { photo } = req.files;
    // const allowedFormats = ["image/jpeg", "image/png", "image/webp"];
    // if (!allowedFormats.includes(photo.mimetype)) {
    //   return res.status(400).json({
    //     message: "Invalid photo format. Only jpg and png are allowed",
    //   });
    // }
    try {
      const {name,email,password}=req.body
  
      const useremail=await User.findOne({email})
      if(useremail){
        return res.status(200).json({msg:"exits"})
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const create=await User.create({
      
        name,email,password:hashedPassword
        
      })
      res.status(201).json({msg:"done",create,

        token:await create.generateToken(),
        userId:create._id.toString()

      })
  
    } catch (error) {
      console.log(error)
    }
  
  
};






export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
  
    const user = await User.findOne({ email }).select("+password");
    console.log(user);
    if (!user.password) {
      return res.status(400).json({ message: "User password is missing" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // if (user.role !== role) {
    //   return res.status(400).json({ message: `Given role ${role} not found` });
    // }
    //let token = await createTokenAndSaveCookies(user._id, res);

    res.status(200).json({
      message: "User logged in successfully",
  
        message:user,
        token:await user.generateToken(),
        userId:user._id.toString()

    
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export const getMyProfile = async (req, res) => {

    try {
      const user =req.user;
         console.log(user)
      res.status(200).json({ user });
    } catch (error) {
      console.log(error)
    }

};

export const getAdmins = async (req, res) => {
  const admins = await User.find({ role: "admin" });
  res.status(200).json({ admins });
};