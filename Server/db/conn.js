import mongoose from "mongoose";

const connectDB = async () => {
    const uri = process.env.DB_URI;
    await mongoose.connect(uri);
};

export default connectDB;
