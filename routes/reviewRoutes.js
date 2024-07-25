import express from 'express';
import { createReview, deleteReview, getReviews } from '../controllers/reviewController.js';

const router = express.Router();

// Review routes
router.post('/create', createReview);
router.get('/getreviews', getReviews);
router.delete('/delete/:id', deleteReview);

export default router;
