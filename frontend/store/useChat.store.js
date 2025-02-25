import { create } from "zustand";
import  axiosInstance  from "../src/lib/axios.js";
import toast from "react-hot-toast";
import { userAuthStore } from "./userAuth.store.js";


export const userChatStore=create((set,get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUserLoading:false,
    isMessagesLoading:false,

    getUsers:async()=>{
        set({isUserLoading:true})
        try {
            const res =await axiosInstance.get("/messages/users");
            set({users:res.data});
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isUserLoading:false});
        }

    },

    getMessages:async(userId)=>{
        set({isMessagesLoading:true});
        try {
            const res=await axiosInstance.get(`/messages/${userId}`);
            set({messages:res.data});
            console.log("get messages ",get().messages);
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isMessagesLoading:false});
        }
    },

    
    sendMessage:async(messageData)=>{
        const {selectedUser,messages} = get();
        try {
            const res=await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData);
            set({messages:[...messages,res.data ]})
        } catch (error) {
            console.log("Error sendMesage fun :",error);
        }
    },
    
    subscribeToMessages: () => {
        const { selectedUser } = get();
            console.log("selected user",selectedUser);
        if (!selectedUser) return;
        console.log("new message sub fun ",get().messages);
        const socket = userAuthStore.getState().socket;
    
        socket.on("newMessage", (newMessage) => {
            if(newMessage.senderId !== selectedUser._id) return;
          set({
            messages:[...get().messages, newMessage],
          });
          console.log("after newMessage setup",get().messages);
        });
    
      },

    unsubscribeToMessage:()=>{
        const socket = userAuthStore.getState().socket;
        socket.off("newMessage");
    },
    setSelectedUser:(selectedUser)=>set({selectedUser})

}))