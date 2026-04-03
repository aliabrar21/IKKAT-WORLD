import express from 'express';
import { getCustomers } from '../controllers/customerController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .get(protect, admin, getCustomers);

export default router;
