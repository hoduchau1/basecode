// utils/response/errorResponse.ts

import { Response } from 'express'
import { CodeResponseType } from '../../constants/enums'
import HTTP_STATUS from '../../constants/httpStatus'

interface ErrorOptions {
    message?: string
    status?: number
    code?: CodeResponseType
    error?: any
}

export class ErrorWithStatus {
    private status: number
    private code: CodeResponseType
    private message?: string
    private error?: any

    constructor({ message, status = HTTP_STATUS.INTERNAL_SERVER_ERROR, code = CodeResponseType.Error, error }: ErrorOptions) {
        this.status = status
        this.code = code
        this.message = message
        this.error = error
    }

    send(res: Response) {
        const response: Record<string, any> = {
            code: this.code
        }

        if (this.message) response.message = this.message
        if (this.error !== undefined) response.error = this.error

        return res.status(this.status).json(response)
    }

    // Dùng khi cần trả soft error (status 200 nhưng vẫn là lỗi)
    sendSoft(res: Response) {
        const response: Record<string, any> = {
            code: this.code,
            message: this.message,
            error: this.error
        }

        return res.status(200).json(response)
    }
}
