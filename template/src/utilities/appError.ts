import { ERROR_TYPES, ErrorKey } from "../types/error.js";

class AppError extends Error {
  statusCode: number;
  errorType: string;
  errorCode: string;
  isOperational: boolean;
  data: any;

  constructor(errorKey: ErrorKey, message?: string, data?: any) {
    const { defaultMessage, statusCode, errorType, errorCode } =
      ERROR_TYPES[errorKey];
    super(message || defaultMessage);
    this.statusCode = statusCode;
    this.errorType = errorType;
    this.errorCode = errorCode;
    this.isOperational = true;
    this.data = data;
    // Error.captureStackTrace(this, this.constructor);
  }
}
class ValidationError extends AppError {
  validationMessages: string[];

  constructor(validationMessages?: string[], message?: string) {
    super("VALIDATION_ERROR", message);
    this.validationMessages = validationMessages || [];
  }
}

class NotFoundError extends AppError {
  constructor(message?: string) {
    super("NOT_FOUND_ERROR", message);
  }
}
class UnauthorizedError extends AppError {
  constructor(message?: string) {
    super("UNAUTHORIZED_ERROR", message);
  }
}
class ForbiddenError extends AppError {
  constructor(message?: string) {
    super("FORBIDDEN_ERROR", message);
  }
}
class RateLimiterError extends AppError {
  constructor(message?: string) {
    super("RATE_LIMITER_ERROR", message);
  }
}
class JwtExpiredError extends AppError {
  constructor(message?: string) {
    super("JWT_EXPIRED_ERROR", message);
  }
}
class BadRequestError extends AppError {
  constructor(message?: string) {
    super("BAD_REQUEST_ERROR", message);
  }
}
class InternalServerError extends AppError {
  constructor(message?: string) {
    super("INTERNAL_SERVER_ERROR", message);
  }
}
class CastError extends AppError {
  constructor(message?: string) {
    super("CAST_ERROR", message);
  }
}
class DuplicateFieldError extends AppError {
  constructor(message?: string) {
    super("DUPLICATE_FIELD_ERROR", message);
  }
}
class JwtInvalidError extends AppError {
  constructor(message?: string, data?: any) {
    super("JWT_INVALID_ERROR", message, data);
  }
}

export {
  AppError,
  BadRequestError,
  CastError,
  DuplicateFieldError,
  ForbiddenError,
  InternalServerError,
  JwtExpiredError,
  JwtInvalidError,
  NotFoundError,
  RateLimiterError,
  UnauthorizedError,
  ValidationError,
};
