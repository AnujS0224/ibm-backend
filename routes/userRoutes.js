import express from 'express';
import { register, login, forgotPassword } from '../controllers/userController.js';

const router = express.Router();

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);

export default router;
