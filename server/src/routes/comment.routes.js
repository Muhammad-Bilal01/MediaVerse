import express from "express"
import { isAuthentic } from "../middlewares/auth.middleware.js"
import { createComment, deleteComment, getCommentByPost } from "../controllers/comment.controller.js"

const commentRouter = express.Router()

// create a new comment of the post
commentRouter.post("/:postId", isAuthentic, createComment)

// get all comment of single post
commentRouter.get("/:postId", getCommentByPost)

// delete Comment
commentRouter.delete("/:commentId", isAuthentic, deleteComment)

export default commentRouter;