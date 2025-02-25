import { create } from "zustand";
import  axiosInstance  from "../src/lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL="http://localhost:5001";

export const userAuthStore = create((set,get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers:[],
    socket:null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
            get().connectSocket()
        } catch (error) {
            console.log("Error userAuth store: ", error);
            set({ authUser: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data)=>{
        set({isSigningUp:true})
        try {
            const res=await axiosInstance.post("/auth/signup",data);
            set({authUser:res.data});
            toast.success("Account created successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isSigningUp:false})
        }
    },

    login:async (data)=>{
        set({isLoggingIn:true});
        try {
          const res= await axiosInstance.post("/auth/login",data);
          set({authUser:res.data});
          toast.success("Logged In successfully"); 
            get().connectSocket();
        } catch (error) {
            console.log(error.message)
            // toast.error(error.response.data.message);
        }finally{
            set({isLoggingIn:false});
        }
    },

    logout:async()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Logged out successfully");
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile:async (data)=>{
        set({isUpdatingProfile:true})
        // console.log(isUpdatingProfile);
        try {
            const res = await axiosInstance.put("/auth/update-profile",data);
            set({userAuth:res.data});
            toast.success("Profile is Updated Successfully");
        } catch (error) {
            console.log("Error in update profile store",error);
            toast.error(error.response.data.message);
        }finally{
            set({isUpdatingProfile:false})
        }
    },

    connectSocket:()=>{
        const { authUser } = get();
        if (!authUser || get().socket?.connected) return;
        const socket = io(BASE_URL,{
            query:{
                userId:authUser._id,
            }
        });
        socket.connect()

        set({socket:socket});

        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers:userIds})
        })
    },
    disconnectSocket:()=>{
        if(get().socket?.connected) get().socket.disconnect();
    },
}));