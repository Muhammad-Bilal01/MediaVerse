import { User } from "../models/user.model.js";

export const isAdmin = async (req, res, next) => {
    const userId = req.userId;

    try {
        const user = await User.findOne({ _id: userId })
        // if not admin
        if (!user.isAdmin) {
            const error = new Error("Access Denied! Admins only")
            error.statusCode = 403
            return next(error)
        }

        next()
    } catch (error) {
        next(error)
    }
}