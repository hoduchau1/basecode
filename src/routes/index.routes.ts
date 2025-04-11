
import express from 'express';
import userRoutes from './user.routes';
import devaplayRoutes from './devaplay.routes';
const router = express.Router();


router.use('/users', userRoutes);
router.use('/devaplays', devaplayRoutes);




export default router;
