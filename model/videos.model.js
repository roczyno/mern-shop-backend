import mongoose from "mongoose";

const VideosSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    video_mimetype: {
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

export default mongoose.model("Videos", VideosSchema);
