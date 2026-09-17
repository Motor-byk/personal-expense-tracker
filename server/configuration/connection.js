import mongoose from "mongoose";

export default async function connectDB(){
    try {
        await mongoose.connect(process.env.ATLAS_URI);
    } catch(err){
        console.error(err)
    }
}