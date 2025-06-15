import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Configure middlewares first
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));

// Parse JSON bodies
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Static files
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/admin', adminRouter);
app.use('/api/blog', blogRouter);

// Connect to database and start server
const startServer = async () => {
    try {
        await connectDB();
        console.log('Connected to MongoDB successfully');
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).json({ 
            success: false, 
            message: 'Invalid JSON',
            error: 'Bad Request' 
        });
    }
    if (err.type === 'entity.too.large') {
        return res.status(413).json({
            success: false,
            message: 'Request entity too large',
            error: 'File size is too large. Maximum size is 50MB'
        });
    }
    res.status(500).json({ 
        success: false,
        message: 'Internal Server Error',
        error: err.message 
    });
});

// Start the server
startServer();

export default app;