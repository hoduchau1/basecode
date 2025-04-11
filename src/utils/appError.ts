export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly originalError?: any;
  public readonly data?: any;

  constructor(
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    originalError?: any,
    data?: any 
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.originalError = originalError;
    this.data = data; 

    Error.captureStackTrace(this, this.constructor);
  }
}
