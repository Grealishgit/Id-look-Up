import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://hunter:20034281@cluster0.74u5va3.mongodb.net/id-lookup').
        then(() => console.log("MongoDB Connected Successfully"));
}