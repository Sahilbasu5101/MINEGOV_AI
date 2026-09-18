import { Router, Request, Response } from "express";
import { upload } from "../../middleware/upload.js";
import cloudinary from "../../config/cloudinary.js";

const router = Router();

// POST /api/v1/upload - Upload photographic evidence or statutory PDF to Cloudinary
router.post("/", upload.single("file"), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: "ERROR",
        message: "No file provided. Send file in 'file' field as multipart/form-data.",
      });
    }

    const category = (req.body.category as string) || "general";
    const folder = `minegov_ai/${category}`;

    // Upload directly from RAM buffer to Cloudinary CDN
    const uploadResult: any = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "auto",
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      stream.end(req.file!.buffer);
    });

    res.status(201).json({
      status: "SUCCESS",
      message: "File successfully uploaded to Cloudinary CDN",
      fileUrl: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      format: uploadResult.format,
      bytes: uploadResult.bytes,
      resourceType: uploadResult.resource_type,
      category,
    });
  } catch (err: any) {
    console.error("Cloudinary Upload Error:", err);
    res.status(500).json({
      status: "ERROR",
      message: "Failed to upload file to Cloudinary",
      error: err.message,
    });
  }
});

export default router;