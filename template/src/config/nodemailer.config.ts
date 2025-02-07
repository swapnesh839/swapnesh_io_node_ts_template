import nodemailer from "nodemailer";
import envConfig from "./env.config.js";

const transporter = nodemailer.createTransport({
  host: envConfig.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: envConfig.NODE_MAILER_EMAIL,
    pass: envConfig.NODE_MAILER_PASS,
  },
  logger: false,
});
transporter.verify((error, success) => {
  if (success) {
    console.info("Nodemailer is ready to send emails");
  }
  if (error) {
    console.error("Nodemailer configuration error:", error);
  } else {
    console.info("Nodemailer is ready to send emails");
  }
});

export default transporter;
