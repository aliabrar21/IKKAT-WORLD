import express from 'express';
import { login, register, getMe, getAllUsers, updateUser, deleteUser, verifySignup, verifyLogin, resendOtp } from '../controllers/authController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/verify-signup', verifySignup);
router.post('/login', login);
router.post('/verify-login', verifyLogin);
router.post('/resend-otp', resendOtp);
router.get('/me', protect, getMe);
router.get('/users', protect, admin, getAllUsers);
router.put('/users/:id', protect, admin, updateUser);
router.delete('/users/:id', protect, admin, deleteUser);

export default router;
