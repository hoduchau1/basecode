import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { AppError } from './appError';

import dotenv from 'dotenv';
const secretKey: string = process.env.JWT_SECRET!;

export function generateToken(user: any, expiresIn: string = '1h'): string {
    const options: SignOptions = {
        algorithm: 'HS256',
        expiresIn: expiresIn as any,
    };

    return jwt.sign(user, secretKey, options);
}


export const verifyToken = (token: string, secretKey: string): JwtPayload | null => {
    try {
        const decoded = jwt.verify(token, secretKey) as JwtPayload;
        return decoded;
    } catch (err) {
        throw new AppError('Invalid or expired token', 401);
    }
};
