import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    storageId: {
      type: String,
      required: false, 
    },

    expiresInDays: {
      type: Number,
      default: 3,
      min: 1,
      max: 7,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// TTL index to auto-delete expired files
fileSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Set expiresAt based on expiresInDays before saving
fileSchema.pre("validate", function (next) {
  if (!this.expiresAt && this.expiresInDays) {
    const days = Math.min(Math.max(this.expiresInDays, 1), 30);
    this.expiresAt = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }
  next();
});

const File = mongoose.model("File", fileSchema);

export default File;
