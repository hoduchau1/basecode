// export class AppError extends Error {
//     statusCode: number;
//     status: string;
//     isOperational: boolean;

//     constructor(message: string, statusCode: number = 500) {
//         super(message);
//         this.statusCode = statusCode;
//         this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
//         this.isOperational = true;

//         Error.captureStackTrace(this, this.constructor);
//     }
// }

export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
    public readonly originalError?: any; // <-- khai báo đúng biến
  
    constructor(
      message: string,
      statusCode: number = 500,
      isOperational: boolean = true,
      originalError?: any // <-- nhận đối số đúng tên
    ) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = isOperational;
      this.originalError = originalError; // <-- gán đúng tên biến
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  