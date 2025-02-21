import { NextFunction, Request, Response } from "express";
import { ZodError, ZodSchema } from "zod";

import { ValidationError } from "../utilities/appError.js";

// Refactored validateRequest function
export const validateRequest = (schemas: {
  body?: ZodSchema;
  params?: ZodSchema;
  query?: ZodSchema;
}) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (schemas.body) {
        await schemas.body.parseAsync(req.body);
      }

      // Validate params
      if (schemas.params) {
        await schemas.params.parseAsync(req.params);
      }

      // Validate query
      if (schemas.query) {
        await schemas.query.parseAsync(req.query);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const validationMessages = error.errors.map((err) => err.message);
        next(new ValidationError(validationMessages, validationMessages[0]));
      } else {
        next(error);
      }
    }
  };
};
