import fs from 'fs';
import imagekit from '../configs/imageKit.js';
import Blog from '../models/blogModel.js';
import Comment from '../models/Comment.js';

// Helper function to generate URL slug
const generateSlug = (title) => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
};

// Add blog with ImageKit integration
export const addBlog = async (req, res) => {
    console.log('AddBlog called. req.body:', req.body, 'req.file:', req.file);
    try {
        // Debug: print all fields
        console.log('Full req.body:', req.body);
        console.log('Full req.file:', req.file);
        
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
        const imageFile = req.file;
        
        // Check if all fields are present
        if (!title || !description || !category || !imageFile) {
            return res.json({
                success: false,
                message: "Missing required fields",
                error: "Title, description, category and image are required"
            });
        }
          
        // Upload image to ImageKit
        const fileBuffer = fs.readFileSync(imageFile.path);
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blog-images"
        });

        // Generate URL slug from title
        const use = generateSlug(title);

        // Create new blog with ImageKit URL
        const blog = new Blog({
            use,
            title,
            subTitle,
            description,
            category,
            isPublished,
            image: response.url,
            imageId: response.fileId // Store imageId from ImageKit
        });

        await blog.save();

        // Delete local file after upload
        fs.unlinkSync(imageFile.path);

        return res.status(201).json({
            success: true,
            message: "Blog added successfully",
            error: "",
            blog
        });

    } catch (error) {
        console.error('Error in addBlog:', error);
        // Clean up local file if it exists
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        
        return res.status(500).json({
            success: false,
            message: "Error adding blog",
            error: error.message
        });
    }
};

// Get all published blogs
export const getAllBlogs = async (req, res) => {
    try {
        console.log('Getting all published blogs');
        const blogs = await Blog.find({ isPublished: true })
            .sort({ createdAt: -1 })
            .populate({
                path: 'comments',
                match: { isApproved: true },
                select: 'content author createdAt'
            });

        console.log(`Found ${blogs.length} published blogs`);
        
        return res.status(200).json({
            success: true,
            blogs: blogs
        });
    } catch (error) {
        console.error('Error getting blogs:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching blogs',
            error: error.message
        });
    }
};

// Get blog details by use field with approved comments
export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findOne({ use: req.params.id, isPublished: true })
            .populate({
                path: 'comments',
                match: { isApproved: true },
                select: 'name content createdAt'
            });

        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
                error: "Blog not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Blog fetched successfully",
            error: "",
            blog
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching blog",
            error: error.message
        });
    }
};

// Get all comments
export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find()
            .populate('blog', 'title')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Comments fetched successfully",
            error: "",
            comments
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching comments",
            error: error.message
        });
    }
};

// Approve comment
export const approveComment = async (req, res) => {
    try {
        const { id } = req.params;
        
        const comment = await Comment.findByIdAndUpdate(
            id,
            { isApproved: true },
            { new: true }
        );

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found",
                error: "Comment not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Comment approved successfully",
            error: "",
            comment
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error approving comment",
            error: error.message
        });
    }
};

// Delete comment
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        
        const comment = await Comment.findByIdAndDelete(id);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found",
                error: "Comment not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
            error: ""
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting comment",
            error: error.message
        });
    }
};

// Add comment
export const addComment = async (req, res) => {
    try {
        const { blogId, name, email, content } = req.body;

        if (!blogId || !name || !email || !content) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
                error: "All fields are required"
            });
        }

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
                error: "Blog not found"
            });
        }

        const comment = new Comment({
            blog: blogId,
            name,
            email,
            content,
            isApproved: false
        });

        await comment.save();

        return res.status(201).json({
            success: true,
            message: "Comment added successfully. It will be visible after approval.",
            error: ""
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error adding comment",
            error: error.message
        });
    }
};

// Admin: Get all blogs (including unpublished)
export const getAllBlogsAdmin = async (req, res) => {
    try {
        const blogs = await Blog.find()
            .sort({ createdAt: -1 })
            .populate({
                path: 'comments',
                select: 'name content isApproved createdAt'
            });
        
        return res.status(200).json({
            success: true,
            message: "Blogs fetched successfully",
            error: "",
            blogs
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching blogs",
            error: error.message
        });
    }
};

// Admin: Update blog
export const updateBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const blog = await Blog.findById(blogId);
        
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
                error: "Blog with given ID does not exist"
            });
        }

        const blogData = JSON.parse(req.body.blog);
        let imageUrl = blog.image;

        // Handle new image upload
        if (req.file) {
            const fileBuffer = fs.readFileSync(req.file.path);
            const response = await imagekit.upload({
                file: fileBuffer,
                fileName: req.file.originalname,
                folder: "/blog-images"
            });
            imageUrl = response.url;
            fs.unlinkSync(req.file.path);
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            {
                ...blogData,
                image: imageUrl
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            error: "",
            blog: updatedBlog
        });
    } catch (error) {
        // Clean up local file if it exists
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }
        
        return res.status(500).json({
            success: false,
            message: "Error updating blog",
            error: error.message
        });
    }
};

// Admin: Delete blog
export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found",
                error: "Blog with given ID does not exist"
            });
        }

        // Delete associated comments
        await Comment.deleteMany({ blogId: blog._id });
        
        // Delete the blog
        await Blog.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            success: true,
            message: "Blog deleted successfully",
            error: ""
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting blog",
            error: error.message
        });
    }
};

// Get dashboard data
export const getDashboardData = async (req, res) => {
    try {
        const [totalBlogs, publishedBlogs, comments] = await Promise.all([
            Blog.countDocuments(),
            Blog.countDocuments({ isPublished: true }),
            Comment.countDocuments()
        ]);

        const latestBlogs = await Blog.find()
            .sort({ createdAt: -1 })
            .limit(5)
            .select('title isPublished createdAt');

        const data = {
            stats: {
                totalBlogs,
                publishedBlogs,
                draftBlogs: totalBlogs - publishedBlogs,
                totalComments: comments
            },
            latestBlogs
        };

        return res.status(200).json({
            success: true,
            message: "Dashboard data fetched successfully",
            error: "",
            data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error fetching dashboard data",
            error: error.message
        });
    }
};