import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: "pagermedia"
        });

        console.log("Database connected");

    } catch (error) {
        console.log("DB ERROR:", error.message);
        throw error; // important for server control
    }
};

export default connectDB;