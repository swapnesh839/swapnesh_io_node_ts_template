import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response as ExpressResponse } from "express";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";

import envConfig from "./config/env.config.js";
import { startServer } from "./config/template.config.js";
import { errorHandler, notFoundMiddleware } from "./middlewares/error.middleware.js";
import { normalizeEmailsMiddleware } from "./middlewares/normalizeEmails.middleware.js";
import trimMiddleware from "./middlewares/trim.middleware.js";
import RootRouter from "./routes/routes.js";
// import connectDB from "./config/db.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 120 });

export const app = express();
export type ServerType = ReturnType<typeof app>;

startServer({ port: Number(envConfig.PORT), app });
// db connection
// const initialize = () => {
//  connectDB();
// };
// initialize();

app.use(limiter);
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  }),
);

app.use(helmet());
app.use(express.json());
app.use(mongoSanitize());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(trimMiddleware);
app.use(normalizeEmailsMiddleware);
app.use(RootRouter);
app.get("/", (_: Request, res: ExpressResponse) => {
  res.sendFile(path.join(__dirname, "../public/starter.html"));
});
app.use(notFoundMiddleware);
app.use(errorHandler);

