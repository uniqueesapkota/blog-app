import express from 'express';
import { adminLogin, refreshToken, verifyToken, getDashboardData } from "../controllers/adminController.js";
import { auth } from '../middleware/auth.js';

const adminRouter = express.Router();

// Public routes
adminRouter.post("/login", adminLogin);
adminRouter.post("/refresh-token", refreshToken);

// Protected routes
adminRouter.get("/verify-token", auth, verifyToken);
adminRouter.get("/dashboard", auth, getDashboardData);

export default adminRouter;