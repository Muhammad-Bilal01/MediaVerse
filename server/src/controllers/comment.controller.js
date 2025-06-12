import { Comment } from "./../models/comment.model.js"

export const createComment = async (req, res, next) => {
    try {
        const { content } = req.body;
        const postId = req.params.postId;
        const userId = req.userId;

        const comment = await Comment.create({
            content,
            post: postId,
            user: userId,
        })

        res.status(201).json({ message: "Comment Created!", comment })
    } catch (error) {
        next(error)
    }
}

export const getCommentByPost = async (req, res, next) => {
    try {
        const postId = req.params.postId;

        const comments = await Comment.find({ post: postId })

        res.status(200).json({ comments })
    } catch (error) {
        next(error)
    }
}

export const deleteComment = async (req, res, next) => {
    try {
        const commentId = req.params.commentId;
        const comment = await Comment.findById(commentId);

        // comment Not Found 
        if (!comment) {
            const error = new Error("Comment Not Found")
            error.statusCode = 404
            return next(error)
        }

        // Delete One
        await comment.deleteOne({ _id: commentId })
        res.status(200).json({
            message: "Comments Deleted",
            commentId: commentId,
        })
    } catch (error) {
        next(error)
    }
}