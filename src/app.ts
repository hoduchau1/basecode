import express from 'express';
import cors from 'cors';
import userRoutes from './routes/index.routes';
import envConfigs, { corsOrigins, isProduction, port } from './constants/env'
import dotenv from 'dotenv';
import helmet from 'helmet';
import { globalErrorHandler } from "./controllers/globalErrorHandler";
import rateLimit from 'express-rate-limit';

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({
    origin: corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));


app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

app.use(helmet());



const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000,
    message: 'Too many requests, please try again later.',
});
app.use(limiter);




app.use('/api/v1', userRoutes);
app.use((req, res, next) => {
    res.status(404).send('404 Not Found');
});

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Route not found',
        status: 404
    });
});

app.use(globalErrorHandler);

export default app;
