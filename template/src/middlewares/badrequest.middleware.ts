import { NextFunction, Request, Response } from "express";

export const responseMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.badRequest = (message = "Bad Request") => {
    res.status(400).json({
      success: false,
      message,
    });
  };
  res.created = (data: any, message?: string) => {
    res.json({
      success: true,
      data,
      message,
    });
  };
  next();
};
