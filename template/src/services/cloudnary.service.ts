import type {
  UploadApiResponse,
  UploadApiOptions,
  DeleteApiResponse,
} from "cloudinary";
import cloudinary from "../config/cloudnary.config.js";

export const uploadImage = async (
  buffer: Buffer,
  // originalname: string,
): Promise<UploadApiResponse> => {
  try {
    const options: UploadApiOptions = {
      folder: "ByeNext",
      resource_type: "auto",
    };

    return new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(options, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result as UploadApiResponse);
          }
        })
        .end(buffer);
    });
  } catch (error) {
    throw new Error(`Error uploading image: ${(error as Error).message}`);
  }
};

export const getImageUrl = (
  publicId: string,
  options: { width?: number; height?: number; crop?: string } = {},
): string => {
  try {
    return cloudinary.url(publicId, {
      width: options.width,
      height: options.height,
      crop: options.crop,
    });
  } catch (error) {
    throw new Error(`Error generating image URL: ${(error as Error).message}`);
  }
};

export const deleteImage = async (
  publicId: string,
): Promise<DeleteApiResponse> => {
  try {
    return await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new Error(`Error deleting image: ${(error as Error).message}`);
  }
};
