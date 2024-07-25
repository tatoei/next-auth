import mongoose from "mongoose";

export const connentMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log("Connecyed to MongoDB");
    } catch (error) {
        console.log("Error connenting to MongoDB: ", error)
    }
}