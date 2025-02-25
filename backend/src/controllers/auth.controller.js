import { generateJwtToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
   
    if(!fullName || !email || !password){
        return res.status(400).json({message:"all fields are required"});
    }

    if (password.length < 6) {
     return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    const user = await User.findOne({ email });
   
    if (user)
      return res.status(400).json({ message: "Email is already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashPassword,
    });
    if (newUser) {
      //jwt generate here
      generateJwtToken(newUser._id, res);
      await newUser.save();

      res.status(201).json({
        id: newUser._id,
        name: newUser.fullName,
        email: newUser.email,
        profileImage: newUser.profilePic,
      });
    } else {
      res.status(400).json({ message: "Invaild user data" });
    }
  } catch (error) {
    console.log("Error in signup controller : ", error.message);
    res.status(500).json({ message: "Interal Server Error" });
  }
};
export const login = async(req, res) => {
    const {email,password}=req.body;
    try {
      const user=await User.findOne({email});
      // console.log("user ",user)
      if(!user){
        return res.status(400).json({message:"Invaild user fields email"})         
      }
      const isPasswordVaild= await bcrypt.compare(password,user.password);

      if(!isPasswordVaild){
       return res.status(400).json({message:"Invaild user fields"})
      }

      generateJwtToken(user._id,res);

      res.status(200).json({
        id:user._id,
        fullName:user.fullName,
        email:user.email,
        profileImage:user.profilePic,
      })

    } catch (error) {
      console.log("Error in login controller : ",error.message);
      res.status(500).json({message:"Internal Server Error"})
    }
};
export const logout = (req, res) => { 
  try {
    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"Logged Out successfully"});

  } catch (error) {
    console.log("Error Logout controller : ",error.message);
    res.status(500).json({message:"Internal Server Error"})
  }
};
export const updateProfile=async (req,res)=>{
 const {profilePic} =req.body;
  const user=req.user.id;
  try {
    if(!profilePic){
      return res.status(400).json({message:"Profile is required"})
    }
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const profilePicUrl = uploadResponse.secure_url;
    const updateUser = await User.findByIdAndUpdate(user,{profilePic:profilePicUrl},{new:true});
    res.status(200).json({user:updateUser})
  } catch (error) {
    console.log("Error updateProfile controller : ",error.message);
    res.status(500).json({message:"Internal Server Error"})
  }
}
export const checkAuth=(req,res)=>{
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error check Auth controller :",error.message);
    res.status(500).json({message:"Internal Server Error"});
  }
};

