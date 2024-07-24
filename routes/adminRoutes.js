// routes/adminRoutes.js
import express from 'express';
import { getAllUsers, deleteUser } from '../controllers/adminController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/users', authMiddleware, adminMiddleware, getAllUsers);
router.delete('/user/:id', authMiddleware, adminMiddleware, deleteUser);

export default router;
