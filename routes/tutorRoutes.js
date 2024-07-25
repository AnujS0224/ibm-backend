import express from 'express';
import { createTutorProfile, deleteTutorProfile, getTutorProfile, updateTutorProfile } from '../controllers/tutorController.js';

const router = express.Router();

// Tutor routes
router.post('/create', createTutorProfile);
router.get('/get-tutor/:id', getTutorProfile);
router.put('/update-tutor/:id', updateTutorProfile);
router.delete('/delete/:id',  deleteTutorProfile);

export default router;
