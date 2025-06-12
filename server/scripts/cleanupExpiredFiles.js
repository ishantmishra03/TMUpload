import cloudinary from '../config/cloudinary.config.js';
import File from '../models/file.models.js';

const cleanupExpiredFiles = async () => {
  try {
    const now = new Date();

    const expiredFiles = await File.find({ expiresAt: { $lte: now } });

    for (const file of expiredFiles) {
      try {
        // 1. Delete from Cloudinary
        await cloudinary.uploader.destroy(file.cloudinaryId, {
          resource_type: 'auto',
        });

        // 2. Delete from DB
        await file.deleteOne();

        console.log(`Deleted ${file.filename}`);
      } catch (err) {
        console.error(`Failed to delete ${file.filename}:`, err.message);
      }
    }
  } catch (error) {
    console.error('Cleanup failed:', error.message);
  }
};

export default cleanupExpiredFiles;
