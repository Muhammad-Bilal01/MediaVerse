import express from "express"
import { login, signup } from "../controllers/auth.controller.js";


const authRoute = express.Router()

// login
authRoute.post("/login", login)

// signup
authRoute.post("/signup", signup)


// forgot-password


export default authRoute;