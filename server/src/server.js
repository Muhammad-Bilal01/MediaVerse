import express from "express"
import cors from "cors"
import { connectDB } from "./configs/db.js";
import authRoute from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";

const app = express()

// Global Middlewares

// parse application/json
app.use(express.json())

// cors
app.use(cors())

try {
    connectDB()
    console.log("Database is connected")
} catch (error) {
    console.error("Error", error)
}

// test route
app.get('/', (req, res) => {
    res.send(`Welcome to blog app!`);
});

// Routes
app.use("/api/auth", authRoute)
app.use("/api/users", userRouter)
app.use("/api/admin", adminRouter)


// error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);

    const statusCode = err.statusCode || 500
    res.status(statusCode).json({ error: err.message })
})

const PORT = process.env || 4000

app.listen(PORT, () => {
    console.log('Server running on port', PORT);
});