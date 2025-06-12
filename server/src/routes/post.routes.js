import express from "express"
import { createPost, deletePostById, getAllPosts, getPostById, updatePostById } from "../controllers/post.controller.js";
import { isAuthentic } from "../middlewares/auth.middleware.js";

const postRouter = express.Router()

// create Post
postRouter.post("/create", isAuthentic, createPost)

// get all posts
postRouter.get("/", getAllPosts)

// get post by ID
postRouter.get("/:postId", getPostById)

// Delete post by ID
postRouter.delete("/:postId", isAuthentic, deletePostById)

// Update post by ID
postRouter.put("/:postId", isAuthentic, updatePostById)

export default postRouter;