import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();
export const connectDb=async()=>{
    try {
        await mongoose.connect(process.env.DB_URI!);
        console.log("Database connected successfully");
        
    } catch (error) {
        console.error("Error connecting database",error);
        throw new Error("Error connecting database");
    }
}