import cloudinary from "../config/cloudinary.config.js";
import File from '../models/file.models.js';
import { v4 as uuidv4 } from 'uuid';
import cleanupExpiredFiles from '../scripts/cleanupExpiredFiles.js';
import { v2 as cloudinaryV2 } from 'cloudinary';

export const uploadFile = async (req, res) => {
  await cleanupExpiredFiles();
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const { originalname, mimetype, size, buffer } = req.file;
    const uniqueFilename = `${uuidv4()}_${originalname}`;
    const expiresInDays = 3;

    const base64File = `data:${mimetype};base64,${buffer.toString('base64')}`;

    const uploadResult = await cloudinary.uploader.upload(base64File, {
      public_id: uniqueFilename,
      resource_type: 'auto',
    });

    const downloadUrl = uploadResult.secure_url.replace('/upload/', '/upload/fl_attachment/');

    const fileDoc = await File.create({
      filename: originalname,
      size,
      mimetype,
      url: downloadUrl,
      cloudinaryId: uploadResult.public_id,
      expiresInDays,
    });

    res.status(201).json({
      success: true,
      file: {
        _id: fileDoc._id,
        filename: fileDoc.filename,
        size: fileDoc.size,
        mimetype: fileDoc.mimetype,
        expiresAt: fileDoc.expiresAt,
        downloadUrl, 
      },
      message: 'Uploaded',
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ success: false, message: 'Failed to upload file' });
  }
};


//List all uploads
export const listFile = async (req, res) => {
  try {
    const uploads = await File.find();

    return res.json({ success: true, uploads });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}

// Get unique file by ID from DB
export const getFileData = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "File ID is required" });
    }

    const file = await File.findById(id);

    if (!file) {
      return res.status(404).json({ success: false, message: "File not found" });
    }

    return res.status(200).json({ success: true, file });
  } catch (error) {
    console.error("Error fetching file:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

