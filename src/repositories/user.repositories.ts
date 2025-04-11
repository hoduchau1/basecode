import { db, SqlParameter } from '../databases/mssql.database'
import mssql from 'mssql'
import { TYPES } from 'mssql'
import { USERS_STORE_PROCEDURE } from '../constants/procedures'

//ki hieu r_ la ki hieu du lieu ben trong db

export class UsersRepository {
    async login({
        username,
        password
    }: {
        username: string
        password: string
    }) {
        const parameters: SqlParameter[] = [
            { name: 'i_Username', type: TYPES.NVarChar(100), value: username },
            { name: 'i_Password', type: TYPES.NVarChar(255), value: password },

            { name: 'o_UserId', type: TYPES.Int, isOutput: true },
            { name: 'o_Username', type: TYPES.NVarChar(50), isOutput: true },
            { name: 'o_Role', type: TYPES.NVarChar(50), isOutput: true }
        ]

        return db.executeStoredProcedure<any>({
            procedureName: USERS_STORE_PROCEDURE.USER_LOGIN,
            parameters
        })
    }

    async getUserData({ userId }: { userId: number }) {
        const parameters: SqlParameter[] = [
            { name: 'i_UserId', type: TYPES.Int, value: userId }
        ]

        return db.executeStoredProcedure<any>({
            procedureName: USERS_STORE_PROCEDURE.USER_GET_DATA,
            parameters
        })
    }

    async getListUsers() {
        return db.executeStoredProcedure<any>({
            procedureName: USERS_STORE_PROCEDURE.USER_GET_LIST,
            parameters: []
        })
    }

    async updateRefreshToken({
        userId,
        jid,
        token,
        expiresAt
    }: {
        userId: number
        jid: string
        token: string
        expiresAt: Date
    }) {
        const parameters: SqlParameter[] = [
            { name: 'i_UserId', type: TYPES.Int, value: userId },
            { name: 'i_Jid', type: TYPES.UniqueIdentifier, value: jid },
            { name: 'i_Token', type: TYPES.NVarChar, value: token },
            { name: 'i_ExpiresAt', type: TYPES.DateTime, value: expiresAt }
        ]

        return db.executeStoredProcedure<any>({
            procedureName: USERS_STORE_PROCEDURE.USER_UPDATE_REFRESH_TOKEN,
            parameters
        })
    }

    async saveRefreshToken({
        userId,
        jid,
        token,
        expiresAt
    }: {
        userId: number
        jid: string
        token: string
        expiresAt: Date
    }) {
        const parameters: SqlParameter[] = [
            { name: 'i_UserId', type: TYPES.Int, value: userId },
            { name: 'i_Jid', type: TYPES.UniqueIdentifier, value: jid },
            { name: 'i_Token', type: TYPES.NVarChar, value: token },
            { name: 'i_ExpiresAt', type: TYPES.DateTime, value: expiresAt }
        ]

        return db.executeStoredProcedure<any>({
            procedureName: USERS_STORE_PROCEDURE.USER_SAVE_REFRESH_TOKEN,
            parameters
        })
    }
    async upsertRefreshToken({
        userId,
        jid,
        token,
        expiresAt
    }: {
        userId: number
        jid: string
        token: string
        expiresAt: Date
    }) {
        const parameters: SqlParameter[] = [
            { name: 'i_UserId', type: TYPES.Int, value: userId },
            { name: 'i_Jid', type: TYPES.UniqueIdentifier, value: jid },
            { name: 'i_Token', type: TYPES.NVarChar, value: token },
            { name: 'i_ExpiresAt', type: TYPES.DateTime, value: expiresAt }
        ]

        return db.executeStoredProcedure<any>({
            procedureName: USERS_STORE_PROCEDURE.USER_UPSERT_REFRESH_TOKEN,
            parameters
        })
    }
    // Vô hiệu hóa tất cả token cũ của user trước khi tạo token mới
    async deactivateAllTokensByUserId(userId: number) {
        const parameters: SqlParameter[] = [
            { name: 'i_UserId', type: TYPES.Int, value: userId }
        ]

        return db.executeStoredProcedure({
            procedureName: USERS_STORE_PROCEDURE.USER_DEACTIVATE_ALL_TOKENS,
            parameters
        })
    }

}
