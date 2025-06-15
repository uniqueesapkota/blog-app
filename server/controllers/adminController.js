import jwt from "jsonwebtoken";
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';

const generateToken = (user) => {
    // Access token (short-lived)
    const token = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    // Refresh token (long-lived)
    const refreshToken = jwt.sign(
        { email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    return { token, refreshToken };
};

// Admin login handler
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Get credentials from environment variables
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        // Make sure admin credentials are configured
        if (!adminEmail || !adminPassword) {
            console.error('Admin credentials not properly configured in environment variables');
            return res.status(500).json({
                success: false,
                message: "Server configuration error"
            });
        }

        // Validate credentials
        if (email === adminEmail && password === adminPassword) {
            // Generate tokens
            const { token, refreshToken } = generateToken({ email });

            // Send success response
            return res.status(200).json({
                success: true,
                message: "Login successful",
                token,
                refreshToken
            });
        }

        // Invalid credentials
        return res.status(401).json({
            success: false,
            message: "Invalid email or password"
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                error: "Refresh token is required"
            });
        }

        try {
            // Verify the refresh token
            const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
            
            // Generate new access token
            const newToken = jwt.sign(
                { email: decoded.email },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return res.status(200).json({
                success: true,
                message: "Token refreshed successfully",
                error: "",
                token: newToken
            });
        } catch (verifyError) {
            return res.status(401).json({
                success: false,
                message: "Token refresh failed",
                error: "Invalid refresh token"
            });
        }
    } catch (error) {
        console.error('Token refresh error:', error);
        return res.status(500).json({
            success: false,
            message: "Server error during token refresh",
            error: "Internal server error"
        });
    }
};

export const verifyToken = async (req, res) => {
    try {
        // The auth middleware will have already verified the token
        // If we get here, the token is valid
        return res.status(200).json({
            success: true,
            message: "Token is valid"
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Token verification failed",
            error: error.message
        });
    }
};

export const getDashboardData = async (req, res) => {
    try {
        // Get counts
        const totalBlogs = await Blog.countDocuments();
        const publishedBlogs = await Blog.countDocuments({ isPublished: true });
        const draftBlogs = await Blog.countDocuments({ isPublished: false });
        const totalComments = await Comment.countDocuments();

        // Get latest blogs
        const latestBlogs = await Blog.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('title isPublished createdAt');

        return res.status(200).json({
            success: true,
            data: {
                stats: {
                    totalBlogs,
                    publishedBlogs,
                    draftBlogs,
                    totalComments
                },
                latestBlogs
            }
        });
    } catch (error) {
        console.error('Dashboard data error:', error);
        return res.status(500).json({
            success: false,
            message: "Error fetching dashboard data",
            error: error.message
        });
    }
};