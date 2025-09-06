import { Router } from 'express';
import { authController } from '../controllers/authController';

const router = Router();

// Signup
router.post('/signup', authController.signup);

// Login
router.post('/login', authController.login);

export default router;
