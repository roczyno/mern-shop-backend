import mongoose from "mongoose";

const ImagesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    image_mimetype: {
      type: String,
      required: true,
    },
    download: {
      type: Number,
      default: 0,
    },
    emailsSent: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Images", ImagesSchema);
