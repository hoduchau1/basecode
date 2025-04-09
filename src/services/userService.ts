import { v4 as uuidv4 } from 'uuid'
import { generateToken } from '../utils/jwt'
import ms from 'ms'
import { AppError } from '../utils/appError';
import { UsersRepository } from '../repositories/user.repositories'
const usersRepository = new UsersRepository()


export const loginUser = async (username: string, password: string) => {

    const result = await usersRepository.login({ username, password })
    console.log(result)
    const { o_UserId, o_Username, o_Role } = result.outputParameters

    const statusCode = result.returnValue
    if (!o_UserId) {
        throw new AppError('Invalid username or password', 401)
    }

    await usersRepository.deactivateAllTokensByUserId(o_UserId)

    const payload = {
        user_id: o_UserId,
        username: o_Username,
        role: o_Role
    }

    const accessToken = generateToken(payload, process.env.JWT_EXPIRE_ACCESS)
    const refreshToken = generateToken(payload, process.env.JWT_EXPIRE_REFRESH)
    const jid = uuidv4()

    //tam thoi chua fix duoc loi chuyen doi 7d sang so giay s
    const refreshExpire = '7d'
    const expiresInMs = ms(refreshExpire)

    const expiresAt = new Date(Date.now() + expiresInMs)
    await usersRepository.upsertRefreshToken({
        userId: o_UserId,
        jid,
        token: refreshToken,
        expiresAt
    })

    return {
        accessToken,
        refreshToken,
        jid,
        user: {
            userId: o_UserId,
            username: o_Username,
            role: o_Role
        }
    }
}

export const getUserData = async (userId: number) => {
    const result = await usersRepository.getUserData({ userId })
    if (!result) {
        throw new AppError('User not found', 404); // hoặc custom error class nếu bạn muốn
    }
    return result.recordset
}


//code tam thoi chua xoa
// export const generateRefreshTokenAndStore = async (userId: number) => {
//     const jid = uuidv4()
//     const refreshExpire: string = process.env.JWT_EXPIRE_REFRESH || '7d'
//     const expiresInMs = ms(+refreshExpire)

//     if (!expiresInMs) {
//         throw new Error(`Invalid refresh token format in .env: ${refreshExpire}`)
//     }

//     const expiresAt = new Date(Date.now() + expiresInMs)
//     const payload = { sub: userId, jid }

//     const refreshToken = generateToken(
//         payload,
//         process.env.JWT_EXPIRE_REFRESH
//     );

//     const result = await db.executeStoredProcedure({
//         procedureName: 'InsertUserToken',
//         parameters: [
//             { name: 'UserId', type: TYPES.Int, value: userId },
//             { name: 'Jid', type: TYPES.UniqueIdentifier, value: jid },
//             { name: 'Token', type: TYPES.NVarChar, value: refreshToken },
//             { name: 'ExpiresAt', type: TYPES.DateTime, value: process.env.JWT_EXPIRE_REFRESH }
//         ]
//     })

//     if (result.outputParameters.o_Result !== 1) {
//         throw new Error('Failed to store refresh token')
//     }

//     return refreshToken
// }
