import express from 'express';
import { createReview, deleteReview, getReviews, updateReview } from '../controllers/reviewController.js';

const router = express.Router();

// Review routes
router.post('/create', createReview);
router.get('/getreviews', getReviews);
router.delete('/delete/:id', deleteReview);
router.put('/update/:id',updateReview);

export default router;
