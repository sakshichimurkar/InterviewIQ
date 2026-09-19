import mongoose from "mongoose";

const connectDb = async () => {
    try { //if any error occur it goes to catch and show the error in console if not then it will connect to mongoDB go to try
        if (!process.env.MONGODB_URL) {
            throw new Error("MONGODB_URL is missing from the server environment");
        }

        await mongoose.connect(process.env.MONGODB_URL); //await is used to connect to mongoDB and it will wait for connection to be established before moving on to the next line of code
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};

export default connectDb; //server connect that time data will show, we will use this in index