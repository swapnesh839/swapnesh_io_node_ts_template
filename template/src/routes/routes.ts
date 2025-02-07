import express from "express";
import dummyRouter from "./dummy.routes.js";

const RootRouter = express.Router();
RootRouter.use("/dummy", dummyRouter);

export default RootRouter;
