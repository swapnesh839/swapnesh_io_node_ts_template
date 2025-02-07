import dotenv from "dotenv";
dotenv.config();
// these are some example env variables replace them with your own
const envConfig = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 5000,
  DB_URI: process.env.DB_URI || "",
  JWT_SECRET: process.env.JWT_SECRET || "ddddddddddd",
  JWT_SECRET_EXPIRY: process.env.JWT_SECRET_EXPIRY || "24d",

  API_RATE_LIMIT_MAX: parseInt(process.env.RATE_LIMIT_MAX || "100", 10),
  API_RATE_LIMIT_WINDOW_MS: parseInt(
    process.env.RATE_LIMIT_WINDOW_MS || "900000",
    10,
  ),
  OTP_RATE_LIMIT_MAX: parseInt(process.env.OTP_RATE_LIMIT_MAX || "5", 10),
  OTP_RATE_LIMIT_WINDOW_MS: parseInt(
    process.env.OTP_RATE_LIMIT_WINDOW_MS || "300000",
    10,
  ),
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",
  REDIS_URL: process.env.REDIS_URL,
  REDIS_DEFAULT_TTL: parseInt(process.env.REDIS_DEFAULT_TTL || "3600", 10),
  LOG_FILE_VALIDITY: process.env.LOG_FILE_VALIDITY || "1d",
  NODE_MAILER_EMAIL: process.env.NODEMAILER_EMAIL || "",
  NODE_MAILER_PASS: process.env.NODEMAILER_PASS || "",
  SMTP_HOST: process.env.SMTP_HOST || "",
  SMTP_PORT: parseInt(process.env.SMTP_PORT || "465", 10),
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || "",
  AWS_REGION: process.env.AWS_REGION || "",
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME || "",
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME || "",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
};
export default envConfig;
