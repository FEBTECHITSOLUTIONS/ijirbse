import mongoose from "mongoose";

const dbConfig = async()=>{
   try {
     const connectDB = await mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
     console.log('DB connected successfully.');
     
   } catch (error) {
    console.log('error in connecting db' , error);
    
   }
}

export default dbConfig