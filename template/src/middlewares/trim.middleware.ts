import { NextFunction,Request, Response } from "express";

const trimMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === "string") {
        req.body[key] = req.body[key].trim();
      }
    }
  }
  next();
};

export default trimMiddleware;
