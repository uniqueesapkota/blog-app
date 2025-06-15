import express from "express";
import { 
    addBlog,
    getAllBlogs,
    getBlogById,
    addComment,
    getAllBlogsAdmin,
    updateBlog,
    deleteBlog,
    getDashboardData,
    getAllComments,
    approveComment,
    deleteComment 
} from "../controllers/blogController.js";
import uploadMiddleware from "../middlewares/upload.js";
import { auth } from "../middleware/auth.js";

const blogRouter = express.Router();

// Public routes
blogRouter.get('/list', getAllBlogs);
blogRouter.get('/details/:id', getBlogById); // :id is now the URL slug (use field)
blogRouter.post('/comment', addComment);

// Admin routes (protected)
blogRouter.post("/add", auth, uploadMiddleware, addBlog);
blogRouter.get('/admin/list', auth, getAllBlogsAdmin);
blogRouter.put('/admin/update/:id', auth, uploadMiddleware, updateBlog);
blogRouter.delete('/admin/delete/:id', auth, deleteBlog);
blogRouter.get('/admin/dashboard', auth, getDashboardData);
blogRouter.get('/admin/comments', auth, getAllComments);
blogRouter.put('/admin/comments/approve/:id', auth, approveComment);
blogRouter.delete('/admin/comments/delete/:id', auth, deleteComment);

export default blogRouter;