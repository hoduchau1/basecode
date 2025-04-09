import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { AppError } from '../utils/appError';
import { isProduction } from '../constants/env'; // true nếu đang ở môi trường production

const UseSoftError = process.env.USE_SOFT_ERROR; // bật nếu muốn tất cả response đều trả về status 200

// export const globalErrorHandler: ErrorRequestHandler = (
//     err: any,
//     req: Request,
//     res: Response,
//     next: NextFunction
// ) => {
//     let statusCode = err.statusCode || 500;
//     let status = err.status || 'error';

//     if (!(err instanceof AppError)) {
//         err = new AppError(err.message || 'Something went wrong!', statusCode);
//     }

//     if (!isProduction) {
//         console.error('🔥 Error:', err);
//     }

//     const response = {
//         status,
//         message: err.message,
//         ...(isProduction ? {} : { stack: err.stack }),
//     };

//     if (USE_SOFT_ERROR) {
//         res.status(200).json({
//             code: statusCode,
//             msg: err.message,
//             ...(isProduction ? {} : { debug: response }),
//         });
//         return
//     }

//     res.status(statusCode).json(response);
//     return
// };

import { ErrorWithStatus } from '../models/responses/Error'

export const globalErrorHandler: ErrorRequestHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = err.statusCode || 500
    let message = err.message || 'Something went wrong'

    if (!(err instanceof AppError)) {
        err = new AppError(message, statusCode)
    }

    const errorResponse = new ErrorWithStatus({
        status: statusCode,
        message,
        error: !isProduction ? err.stack : undefined
    })

    if (UseSoftError) {
        errorResponse.sendSoft(res)
        return
    }

    errorResponse.send(res)
    return
}

