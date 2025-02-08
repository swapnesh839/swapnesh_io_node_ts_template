import express from "express";

import authRouter from "./auth.routes.js";
const RootRouter = express.Router();

RootRouter.use("/auth", authRouter);

export default RootRouter;
