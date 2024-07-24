import express from 'express';
import { createTutorProfile, getTutorProfile, updateTutorProfile } from '../controllers/tutorController.js';

const router = express.Router();

// Tutor routes
router.post('/', createTutorProfile);
router.get('/:id', getTutorProfile);
router.put('/:id', updateTutorProfile);

export default router;
