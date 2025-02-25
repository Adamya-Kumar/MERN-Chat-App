import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUserForSidebar=async (req ,res)=>{
    const loggedInUserId = req.user._id;
    try {
        const filterUsers=await User.find({_id:{$ne:loggedInUserId}}).select("-password");

        res.status(200).json(filterUsers);
    } catch (error) {
        console.log("Error getUserForSideBar : ",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}
export const getMessages=async (req,res)=>{
    try {
        const {id:IdOfUserWeChat}=req.params;
        const loggedId=req.user._id;

        const messages = await Message.find({
            $or:[
                {senderId:IdOfUserWeChat,receiverId:loggedId},
                {senderId:loggedId,receiverId:IdOfUserWeChat}
            ]
        })

        res.status(200).json(messages);;
    
    } catch (error) {
        console.log("Error getMessage controller : ",error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const sendMessage=async (req,res)=>{
    try {
        const {text,image}=req.body;
        const {id:receiverId}=req.params;
        const senderId=req.user._id;

        let imageURL;
        if(image){
        const imageResponse = await cloudinary.uploader.upload(image);
            imageURL = imageResponse.secure_url;
        }
    
        const newMessage=new Message({
            senderId,
            receiverId,
            text,
            image:imageURL
        })

        await newMessage.save();
        
       
        // todo : realTime functionality goes here => socket.io

        const receiverSocketId = getReceiverSocketId(receiverId);
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage);
        }
        
        res.status(201).json(newMessage)

    } catch (error) {
        console.log("Error sendMessage controller : ",error.message);
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}