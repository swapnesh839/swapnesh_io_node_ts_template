declare global {
  namespace Express {
    interface Response {
      created: (data: any, message?: string) => void;
      badRequest: (message?: string) => void;
    }
    interface Request {
      user?: IUser;
      // user?: {
      //   name: string;
      //   email: string;
      //   userType: string;
      // };
    }
  }
}

export {};
