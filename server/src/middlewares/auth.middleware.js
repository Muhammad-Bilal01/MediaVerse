import jwt from "jsonwebtoken";


export const isAuthentic = (req, res, next) => {
    const authorization = req.headers.authorization;

    // token not found
    if (!authorization || !authorization.startsWith("Bearer")) {
        const error = new Error("Unauthorized. Token missing.");
        error.statusCode = 401
        return next(error)
    }

    const token = authorization.split(' ')[1];

    try {
        // verify JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        req.userId = decoded.id

        next()
    } catch (error) {
        next(error)
    }
}