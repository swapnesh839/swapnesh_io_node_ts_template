import { PutObjectCommand } from "@aws-sdk/client-s3";

import { s3 } from "../config/aws.config.js";

export const uploadToS3 = async ({
  buffer,
  fileName,
  folderName = "",
}: {
  buffer: Buffer;
  fileName: string;
  folderName: string;
}) => {
  const key = folderName ? `${folderName}/${fileName}` : fileName;
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key,
    Body: buffer,
  });

  try {
    const data = await s3.send(command);
    return data; // Successfully uploaded
  } catch (error) {
    console.error("Error uploading to S3", error);
    throw error;
  }
};
