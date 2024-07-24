import express from 'express';
import { sendMessage, getMessages } from '../controllers/messageController.js';

const router = express.Router();

// Message routes
router.post('/', sendMessage);
router.get('/', getMessages);

export default router;
