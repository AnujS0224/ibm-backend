import express from 'express';
import { createTuitionCenterProfile, getTuitionCenterProfile, updateTuitionCenterProfile } from '../controllers/tuitionCenterController.js';

const router = express.Router();

// Tuition Center routes
router.post('/', createTuitionCenterProfile);
router.get('/:id', getTuitionCenterProfile);
router.put('/:id', updateTuitionCenterProfile);

export default router;
