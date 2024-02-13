import { Router } from "express";
import * as authController from '../controllers/authController.js';

const authRoutes = Router();
authRoutes.post('/login', authController.handleLogin);
authRoutes.post('/signup', authController.handleSignup);

export default authRoutes;
