import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


export const protectRouter = async (req ,res , next)=>{
    const token=req.cookies.jwt;
    try {
        if(!token){
          return  res.status(400).json({message:"Unauthorized- No Token found"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
          return  res.status(400).json({
                message:"Unauthorized - InValid Token"
            })
        }

        const user=await User.findById(decoded.userId).select("-password");

        if(!user){
           return res.status(400).json({message:"User Not Found"})
        }

        req.user =user;

        next();

    } catch (error) {
        console.log("Error protectRouter middleware : ",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}