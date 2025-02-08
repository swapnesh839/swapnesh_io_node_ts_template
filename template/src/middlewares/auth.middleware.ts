import { NextFunction, Request, Response } from "express";

import { UserModel } from "../models/User.model.js";
import authService from "../services/auth.service.js";

const authenticate = (roles: string[] = []) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.badRequest("Token not found");
      }

      const decoded = authService.verifyToken(token);

      const user = await UserModel.findById(decoded.data).lean();
      if (!user) {
        return res.badRequest("User not found");
      }
      if (roles.length && !roles.includes(user.userType.toString())) {
        return res.badRequest(
          "You do not have permission to access this resource",
        );
      }

      req.user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default authenticate;
