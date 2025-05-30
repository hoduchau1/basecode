// src/models/responses/ErrorWithStatus.ts
import { Response } from 'express';
import { CodeResponseType } from '../../constants/enums';
import HTTP_STATUS from '../../constants/httpStatus';

interface ErrorOptions {
  message?: string;
  error?: any;
  status?: number;
  code?: CodeResponseType;
  data?: any; // <-- thêm dòng này
}

export class ErrorWithStatus {
  private readonly status: number;
  private readonly code: CodeResponseType;
  private readonly message?: string;
  private readonly error?: any;
  private readonly data?: any; // <-- thêm dòng này

  constructor({
    message,
    error,
    status = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    code = CodeResponseType.Error,
    data
  }: ErrorOptions) {
    this.status = status;
    this.code = code;
    this.message = `${status} - ${message}`;
    this.error = error;
    this.data = data; // <-- gán lại
  }

  send(res: Response) {
    const payload: Record<string, any> = { code: this.code };
    if (this.message) payload.message = this.message;
    if (this.error !== undefined) payload.error = this.error;
    if (this.data !== undefined) payload.data = this.data; // <-- thêm dòng này
    return res.status(this.status).json(payload);
  }

  sendSoft(res: Response) {
    const payload: Record<string, any> = { code: this.code };
    if (this.message) payload.message = this.message;
    if (this.error !== undefined) payload.error = this.error;
    if (this.data !== undefined) payload.data = this.data; // <-- thêm dòng này
    return res.status(HTTP_STATUS.OK).json(payload);
  }
}
