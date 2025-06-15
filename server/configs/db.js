import mongoose from "mongoose";

const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

        // Set up mongoose connection events
        mongoose.connection.on('connected', () => console.log('Database Connected'));
        mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err));
        mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected'));        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'quickblog',
            // MongoDB Node.js driver 4.0+ automatically handles connection management
        });

        return mongoose.connection;
    } catch (error) {
        console.error('Database connection failed:', error.message);
        throw error; // Re-throw to handle it in the server startup
    }
}

export default connectDB;