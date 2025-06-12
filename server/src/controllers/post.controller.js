import { Post } from "../models/post.model.js"

export const createPost = async (req, res, next) => {
    const { title, content, tags, image } = req.body
    try {

        const post = await Post.create({
            title,
            content,
            tags,
            author: req.userId
        })

        res.status(201).json({
            message: "Blog Create Successfull!",
            post
        })

    } catch (error) {
        next(error)
    }
}

export const getAllPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({}, { __v: false });

        res.status(200).json({ posts })
    } catch (error) {
        next(error)
    }
}

export const getPostById = async (req, res, next) => {
    try {
        const postId = req.params.postId
        const post = await Post.findOne({ _id: postId }, { __v: false });

        // not found
        if (!post) {
            const error = new Error("Post Not Found")
            error.statusCode = 404
            return next(error)
        }

        res.status(200).json({ post })
    } catch (error) {
        next(error)
    }
}

export const deletePostById = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const userId = req.userId;

        const post = await Post.findById(postId)

        // not found
        if (!post) {
            const error = new Error("Post Not Found")
            error.statusCode = 404;
            return next(error)
        }

        console.log("Author", post.author.toString(), userId, typeof post.author)

        // user not matched
        if (post.author.toString() !== userId) {
            const error = new Error("Unauthorized")
            error.statusCode = 403;
            return next(error)
        }

        await post.deleteOne({ _id: postId })
        res.status(200).json({
            message: "Post Delete Successfully",
            id: postId
        })

    } catch (error) {
        next(error)
    }
}
export const updatePostById = async (req, res, next) => {
    try {
        const postId = req.params.postId;
        const userId = req.userId;

        const post = await Post.findById(postId)

        // not found
        if (!post) {
            const error = new Error("Post Not Found")
            error.statusCode = 404;
            return next(error)
        }

        // user not matched
        if (userId !== post.author.toString()) {
            const error = new Error("Unauthorized")
            error.statusCode = 403;
            return next(error)
        }

        const { title, content, tags, image } = req.body
        post.title = title || post.title
        post.content = content || post.content
        post.tags = tags || post.tags
        post.image = image || post.image

        const updated = await post.save()
        res.status(200).json({
            message: "Post Update Successfully",
            post: updated,
        })
    }
    catch (error) {
        next(error)
    }
}