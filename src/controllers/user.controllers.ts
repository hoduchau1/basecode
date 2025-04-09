import { Request, Response, NextFunction } from 'express';
import { loginUser, getUserData } from '../services/userService';
import { SuccessWithStatus } from '../models/responses/Success';
import { ErrorWithStatus } from '../models/responses/Error';
import { AppError } from '../utils/appError';
import { UsersRepository } from '../repositories/user.repositories'
const usersRepository = new UsersRepository()

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            throw new AppError('Username and password are required', 400)
        }

        const {
            accessToken,
            refreshToken,
            user
        } = await loginUser(username, password)

        return new SuccessWithStatus({
            message: 'Login successful',
            data: {
                accessToken,
                refreshToken,
                user
            }
        }).send(res)

    } catch (error) {
        next(error)
    }
}

export const logout = async (req: Request, res: Response) => {
    const userId = (req as any).user.user_id;
    console.log(userId)
    if (!userId) {
        return new ErrorWithStatus({
            message: 'Unauthorized',
            status: 401
        }).send(res)
    }

    await usersRepository.deactivateAllTokensByUserId(userId)

    return new SuccessWithStatus({
        message: 'Logout successful'
    }).send(res)
}


export const getUserDataHandler = async (req: Request, res: Response) => {
    console.log((req as any).user)
    const userId = (req as any).user.user_id;
    const userData = await getUserData(userId);
    console.log(userData)

    if (!userData) {
        return new ErrorWithStatus({
            message: 'dont see eny data user',
            status: 404
        }).send(res)
    }

    return new SuccessWithStatus({
        message: 'your data',
        data: userData[0]

    }).send(res)
}


//code tam thoi chua xoa
// export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const { refreshToken } = req.body;
//         if (!refreshToken) {
//             throw new AppError('Refresh token is required', 400);
//         }
//         const secretKey = process.env.JWT_REFRESH_SECRET;
//         if (!secretKey) {
//             throw new AppError('JWT_REFRESH_SECRET is not defined', 400);
//         }
//         const decoded = verifyToken(refreshToken, secretKey);
//         if (!decoded) {
//             throw new AppError('Invalid or expired refresh token', 401);
//         }

//         const redisKey = `user:${decoded.userId}`;
//         const storedToken = await redisClient.get(redisKey);

//         // Kiểm tra refreshToken có khớp với giá trị lưu trong Redis không
//         if (storedToken !== refreshToken) {
//             throw new AppError('Refresh token mismatch or revoked', 403); // Token bị từ chối
//         }

//         // Tạo mới accessToken và (tùy chọn) refreshToken
//         const accessToken = generateToken(
//             { userId: decoded.userId, role: decoded.role, username: decoded.username },
//             process.env.JWT_EXPIRE_ACCESS
//         );

//         // Nếu cần, có thể tạo một refreshToken mới
//         const newRefreshToken = generateToken(
//             { userId: decoded.userId, role: decoded.role, username: decoded.username },
//             process.env.JWT_EXPIRE_REFRESH
//         );

//         // Cập nhật token mới vào Redis (nếu refreshToken được làm mới)
//         if (newRefreshToken !== refreshToken) {
//             await redisClient.set(redisKey, newRefreshToken);
//         }

//         // Trả về token mới cho client
//         return new SuccessWithStatus({
//             data: {
//                 accessToken,
//                 refreshToken: newRefreshToken !== refreshToken ? newRefreshToken : refreshToken
//             }
//         }).send(res);
//     } catch (err) {
//         next(err); // Gửi lỗi tới middleware errorHandler
//     }
// };


