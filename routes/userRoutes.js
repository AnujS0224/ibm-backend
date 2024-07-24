import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';

const router = express.Router();

// Route to get a user profile by ID
router.get('/:id', getUserProfile);

// Route to update a user profile by ID
router.put('/:id', updateUserProfile);

export default router;
