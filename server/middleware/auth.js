console.log("Auth middleware loaded");
import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    try {
        // Get the token from the Authorization header
        const authHeader = req.headers.authorization;
        console.log('Authorization header:', authHeader);
        console.log('JWT_SECRET:', process.env.JWT_SECRET);
        
        // Check if header exists and has correct format
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: "Authentication failed",
                error: "No token provided or invalid token format. Use 'Bearer YOUR_TOKEN'"
            });
        }

        // Extract the token
        const token = authHeader.split(' ')[1];
        console.log('Token:', token);
        try {
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            // Handle specific JWT errors
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({
                    success: false,
                    message: "Authentication failed",
                    error: "Your token has expired. Please login again."
                });
            }
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({
                    success: false,
                    message: "Authentication failed",
                    error: "Your account cannot be authenticated.",
                    jwtError: error.message
                });
            }
            // Other errors
            return res.status(401).json({
                success: false,
                message: "Authentication failed",
                error: error.message
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error during authentication",
            error: error.message
        });
    }
};
export default auth;