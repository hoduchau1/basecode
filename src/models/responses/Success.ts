import { Response } from 'express'
import { CodeResponseType } from '../../constants/enums'
import HTTP_STATUS from '../../constants/httpStatus'

interface SuccessOptions {
  data?: any
  message?: string
  status?: number
  code?: CodeResponseType
}

export class SuccessWithStatus {
  private status: number
  private code: CodeResponseType
  private data?: any
  private message?: string

  constructor({ data, message, status = HTTP_STATUS.OK, code = CodeResponseType.Ok }: SuccessOptions) {
    this.status = status
    this.code = code
    this.data = data
    this.message = message
  }

  send(res: Response) {
    const response: Record<string, any> = {
      code: this.code,
    }

    if (this.message) response.message = this.message
    if (this.data !== undefined) response.data = this.data

    return res.status(this.status).json(response)
  }
}
