import express from 'express';
import {
    submitMessage, getMessages, submitCustomOrder, getCustomOrders, updateCustomOrderStatus, getDashboardStats
} from '../controllers/utilsController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/messages')
    .post(submitMessage)
    .get(protect, admin, getMessages);

router.route('/custom-orders')
    .post(submitCustomOrder)
    .get(protect, admin, getCustomOrders);

router.route('/custom-orders/:id/status')
    .put(protect, admin, updateCustomOrderStatus);

router.route('/dashboard')
    .get(protect, admin, getDashboardStats);

export default router;
