import { Response } from "express";

declare global {
  namespace Express {
    interface Response {
      badRequest: (message?: string) => void;
    }
    interface Request {
      user?:IUser
      // user?: {
      //   name: string;
      //   email: string;
      //   userType: string;
      // };
    }
  }
}
