import express from "express"
import { isAuthentic } from "./../middlewares/auth.middleware.js"
import { User } from "../models/user.model.js"

const userRouter = express.Router()

userRouter.get("/me", isAuthentic, async (req, res) => {
    const userId = req.userId

    try {
        const user = await User.findOne({ _id: userId }, { password: false, __v: false })

        // user not found
        if (!user) {
            const error = new Error("User Not Found")
            user.statusCode = 404
            return next(error)
        }

        // user found
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
})

export default userRouter