import express from 'express';
import { createPayment, updatePaymentStatus } from '../controllers/paymentController.js';

const router = express.Router();

// Payment routes
router.post('/create', createPayment);
router.post('/update-status', updatePaymentStatus);

export default router;
