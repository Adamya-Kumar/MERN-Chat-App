import jwt from "jsonwebtoken";

export const generateJwtToken=(userId,res)=>{

    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    })

    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,//7d in millsecond
        httpOnly:true,//prevent attacks  xxs (cross site scripting attacks)
        sameSite:"strict",//csrf attack cross-site request forqery attacks
        secure: process.env.NODE_ENV !== "development", //false
    })
    return token;
}