import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure uploads directory exists
const uploadsDir = 'uploads/';
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        // Create a unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

// File filter to only allow specific image types
const fileFilter = (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|webp|WEBP)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

// Create multer upload instance
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit
        files: 1 // Maximum 1 file per request
    }
}).single('image');

// Wrapper function to handle multer errors
const uploadMiddleware = (req, res, next) => {
    upload(req, res, function (err) {
        if (req.fileValidationError) {
            return res.status(400).json({
                success: false,
                message: req.fileValidationError,
                error: 'Invalid file type'
            });
        }
        if (err instanceof multer.MulterError) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).json({
                    success: false,
                    message: 'File size is too large. Maximum size is 10MB',
                    error: 'File too large'
                });
            }
            return res.status(400).json({
                success: false,
                message: err.message,
                error: 'File upload error'
            });
        }
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message,
                error: 'Server error'
            });
        }
        next();
    });
};

export default uploadMiddleware;
