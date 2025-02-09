import { NextFunction, Request, Response } from "express";

export const normalizeEmailsMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.body?.email) {
    req.body.email = req.body.email.trim().toLowerCase();
  }
  next();
};
