import mongoose from "mongoose";

const AudiosSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    audio: {
      type: String,
      required: true,
    },

    audio_mimetype: {
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

export default mongoose.model("Audios", AudiosSchema);
