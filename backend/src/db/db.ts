import mongoose from "mongoose";


export const dbConnect = async() : Promise<void> => {
    await mongoose.connect(process.env.MONGO_URI || '')
}

 