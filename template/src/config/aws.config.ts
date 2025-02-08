import { PutObjectCommandOutput, S3Client } from "@aws-sdk/client-s3";
import { Request } from "express";

import envConfig from "./env.config.js";
export interface CustomAWSRequest extends Request {
  s3Result?: PutObjectCommandOutput | PutObjectCommandOutput[];
}
const s3 = new S3Client({
  region: envConfig.AWS_REGION as string,
  credentials: {
    accessKeyId: envConfig.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: envConfig.AWS_SECRET_ACCESS_KEY,
  },
});

export { s3 };
