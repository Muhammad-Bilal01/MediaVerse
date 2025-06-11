import { User } from "./../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Register User
export const signup = async (req, res, next) => {
    const { name, email, password } = req.body

    try {

        const user = await User.findOne({ email })

        // user already exist
        if (user) {
            const error = new Error("User already exists")
            error.statusCode = 400
            return next(error)
        }

        // Hashing
        const salt = bcrypt.genSaltSync(Number.parseInt(process.env.HASH_SALT));
        const hash = bcrypt.hashSync(password, salt);


        // create new user
        const newUser = await User.create({ name, email, password: hash })

        res.status(201).json({
            message: "User create succeefully!",
            userId: newUser._id
        })

    } catch (error) {
        return next(error)
    }
}


export const login = async (req, res, next) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email });

        // if user not exist
        if (!user) {
            const error = new Error("Invalid Email or Password")
            error.statusCode = 400
            return next(error)
        }

        // password not matched
        const hashPassword = user.password;
        const isMatched = bcrypt.compareSync(password, hashPassword);

        if (!isMatched) {
            const error = new Error("Invalid Credentials")
            error.statusCode = 400
            return next(error)
        }

        // User login
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 });

        res.status(200).json({
            "message": "User Login Successfully!",
            "token": token,
        })


    } catch (error) {
        return next(error)
    }
}