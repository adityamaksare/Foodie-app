import mongoose from "mongoose";
import 'dotenv/config';

// mongo DB connection
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('DB connected successfully');
    } catch (error) {
        console.error('DB connection failed:', error.message);
        process.exit(1);
    }
}