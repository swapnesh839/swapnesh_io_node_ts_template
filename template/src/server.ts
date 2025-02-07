
import express, { Request, Response as ExpressResponse } from "express";

import { createServer } from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import RootRouter from "./routes/routes.js";
import envConfig from "./config/env.config.js";
const app = express();
const server = createServer(app);

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE,PATCH",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  }),
);

app.use(express.json());
app.use(mongoSanitize());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(RootRouter);

app.get("/", (_: Request, res: ExpressResponse) => {
  res.sendFile(path.join(__dirname, "../public/starter.html"));
});
server

  .listen(envConfig.PORT, () => {
    console.log(`Server is running at http://localhost:${envConfig.PORT}/`);
  })
  .on("error", (err) => {
    console.log(err);
    process.exit(1);
  });
