import express from 'express';
import { login, logout, getUserDataHandler } from '../controllers/user.controllers';
import { asyncHandler } from '../utils/asyncHandler';
import { authenticate } from '../middlewares/auth';
import { userIdValidator, loginValidator } from '../schema/user.schema';
import { authorize } from '../middlewares/authorize';

const router = express.Router();
router.post('/login', loginValidator.validate.bind(loginValidator), asyncHandler(login));
router.post('/logout', authenticate, asyncHandler(logout));
router.get('/info/users', authenticate, asyncHandler(getUserDataHandler));
router.get('/admin', authenticate, authorize(['admin']), asyncHandler(async (req, res) => {
    res.json({ message: 'Welcome Admin!' });
}));
export default router;
