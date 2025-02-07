import mongoose from "mongoose";
import { Document, Schema } from "mongoose";

export interface IUser extends Document {
  _id: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  userType: string;
  userStatus: string;
  profilePhoto: string;
  token: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
    },
    phone: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    userType: {
      type: String,
    },
    token: {
      type: String,
    },
    profilePhoto: {
      url: String,
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<IUser>("User", userSchema);
