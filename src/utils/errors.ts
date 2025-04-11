import { AppError } from './appError'; // Đường dẫn phải đúng với vị trí file AppError.ts


export class BadRequestError extends AppError {
  constructor(message = 'Bad Request') {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Not Found') {
    super(message, 404);
  }
}

export class RequestTimeError extends AppError {
    constructor(message = 'RequestTime') {
      super(message, 408);
    }
  }

export class ConflictError extends AppError {
  constructor(message = 'Conflict') {
    super(message, 409);
  }
}


export class UnprocessableEntityError extends AppError {
  constructor(message = 'Unprocessable Entity') {
    super(message, 422);
  }
}
