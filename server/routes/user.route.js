import express from "express"
import isAuth from "../middlewares/isAuth.js";
import { getCurrentuser } from "../controllers/user.controller.js";

const userRouter = express.Router()

//we have to do only get rqst here dont want data from server

userRouter.get("/current-user",isAuth,getCurrentuser)


export default userRouter;

//now for fetching route index.js 