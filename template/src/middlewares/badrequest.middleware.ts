import { NextFunction, Request, Response } from "express";

export const responseMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.badRequest = (message = "Bad Request") => {
        res.status(400).json({
            success: false,
            message,
        });
    };
    next();
};