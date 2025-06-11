import express from "express"
import { User } from "../models/user.model.js";
import { isAuthentic } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/admin.middleware.js";

const adminRouter = express.Router()

adminRouter.get("/users", [isAuthentic, isAdmin], async (req, res, next) => {
    try {

        const users = await User.find({}, { password: false, __v: false })

        res.status(200).json({ users })
    } catch (error) {
        next(error)
    }
})

export default adminRouter;