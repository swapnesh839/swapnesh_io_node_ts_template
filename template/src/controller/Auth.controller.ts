import bcrypt from "bcryptjs";
import { NextFunction, Request, Response } from "express";

import { UserModel } from "../models/User.model.js";
import authService from "../services/auth.service.js";

export const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, phone, email, password, userType } = req.body;

    const existingUser = await UserModel.findOne({ email, userType }).lean();
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      name,
      phone,
      email,
      password: hashedPassword,
      userType,
    });

    const { password: _, ...userWithoutPassword } = newUser.toObject();

    return res.created(userWithoutPassword, "User Created Successfully");
  } catch (error) {
    next(error);
  }
};
export const signInController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password, userType } = req.body;
    const user = await UserModel.findOne({ email, userType }).lean();
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid password" });
      return;
    }
    const { password: _, ...userWithoutPassword } = user;

    const token = authService.generateToken(user._id.toString());

    return res.created(
      {
        token,
        user: userWithoutPassword,
      },
      "User Logged In Successfully",
    );
  } catch (error) {
    next(error);
  }
};
