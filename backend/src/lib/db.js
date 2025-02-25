import mongoose from "mongoose";
export  const connectDB=async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`\x1b[33mMongoDB connected : ${conn.connection.host}\x1b[0m`);
    } catch (error) {
        console.log(`MongoDB error : ${error.message}`)
    }
}