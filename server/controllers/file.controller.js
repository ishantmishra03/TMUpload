import imagekit from "../config/imagekit.config.js";
import File from '../models/file.models.js';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const { originalname, mimetype, size, buffer } = req.file;
    const uniqueFilename = `${uuidv4()}_${originalname}`;
    const expiresInDays = 3;

    const uploadResult = await imagekit.upload({
      file: buffer,
      fileName: uniqueFilename,
      folder: "/TMUpload",
    });

    const downloadUrl = `${uploadResult.url}?response-content-disposition=attachment`;

    const fileDoc = await File.create({
      filename: originalname,
      size,
      mimetype,
      url: downloadUrl,
      storageId: uploadResult.fileId,
      expiresInDays,
      name: uploadResult.name,
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

//DownloadFile
export const downloadFile = async (req, res) => {
  try {
    const { id } = req.params;

    const file = await File.findById(id);
    if (!file) {
      return res.status(404).json({ success: false, message: "File not found" });
    }

    const response = await axios.get(file.url, { responseType: "stream" });

    res.setHeader("Content-Disposition", `attachment; filename="${file.filename}"`);
    res.setHeader("Content-Type", file.mimetype);

    response.data.pipe(res);
  } catch (error) {
    console.error("Download error:", error.message);
    res.status(500).json({ success: false, message: "Failed to download file" });
  }
};




