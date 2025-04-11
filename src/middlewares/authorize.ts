import { Request, Response, NextFunction } from 'express';
import {ForbiddenError} from '../utils/errors'
export const authorize = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = (req as any).user;

        if (!user || !roles.includes(user.role)) {
            res.status(403).json({ message: 'Forbidden' });
            throw new ForbiddenError('You do not have permission to perform this action');
        }

        next();
    };
};
