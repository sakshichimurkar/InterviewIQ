//create server here aand run dev through nodemon
import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDb.js"; //import connectDb function from connectDb.js file to connect to MongoDB
import cookieParser from "cookie-parser";
dotenv.config();
import cors from "cors"
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import interviewRouter from "./routes/interview.route.js";
import paymentRouter from "./routes/payment.route.js";

//app initialize express through
const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials:true

}))





app.use(express.json())
app.use(cookieParser())

//api create

app.use("/api/auth", authRouter)// now we have to fetch this api

app.use ("/api/user", userRouter)
app.use("/api/interview", interviewRouter)
app.use("/api/payment", paymentRouter)





const PORT =  process.env.PORT || 6000;


const startServer = async () => {
    try {
        await connectDb();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch {
        console.error("Server stopped because MongoDB connection failed");
        process.exitCode = 1;
    }
};

startServer();

