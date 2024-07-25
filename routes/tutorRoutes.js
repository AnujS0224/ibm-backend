import express from 'express';
import { createTutorProfile, deleteTutorProfile, getTutorProfile, updateTutorProfile } from '../controllers/tutorController.js';
import {singleUpload} from "../middleware/multer.js"

const router = express.Router();

// Tutor routes
router.post('/create',singleUpload, createTutorProfile);
router.get('/get-tutor/:id', getTutorProfile);
router.put('/update-tutor/:id',singleUpload, updateTutorProfile);
router.delete('/delete/:id',  deleteTutorProfile);

export default router;
