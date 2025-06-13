import imagekit from "../config/imagekit.config.js";
import File from '../models/file.models.js';
import { v4 as uuidv4 } from 'uuid';

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const { originalname, mimetype, size, buffer } = req.file;
    const uniqueFilename = `${uuidv4()}_${originalname}`;
    const expiresInDays = 3;

    const base64File = buffer.toString('base64');

    const uploadResult = await imagekit.upload({
      file: base64File,
      fileName: uniqueFilename,
      folder: "/TMUpload",
    });

    const downloadUrl = uploadResult.url + "?tr=fl-force-download";

    

    const fileDoc = await File.create({
      filename: originalname,
      size,
      mimetype,
      url: downloadUrl,
      storageId: uploadResult.fileId, 
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
    const uploads = await File.find().sort({ createdAt: -1 });

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

