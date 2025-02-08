import { Router } from "express";

import {
  signInController,
  signUpController,
} from "../controller/Auth.controller.js";
import { validateRequest } from "../middlewares/validate.middleware.js";
import { signInSchema, signUpSchema } from "../validations/user.validation.js";

const authRouter = Router();
authRouter.post("/signUp", validateRequest(signUpSchema), signUpController);
authRouter.post("/signIn", validateRequest(signInSchema), signInController);

export default authRouter;
