import express from 'express';
import { createTuitionCenterProfile, deleteTuitionCenterProfile, getTuitionCenterProfile, updateTuitionCenterProfile } from '../controllers/tuitionCenterController.js';

const router = express.Router();

// Tuition Center routes
router.post('/create', createTuitionCenterProfile);
router.get('/get-profile/:id', getTuitionCenterProfile);
router.put('/update/:id', updateTuitionCenterProfile);
router.delete('/delete/:id', deleteTuitionCenterProfile);

export default router;
