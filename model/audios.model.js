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
    imageUrl: {
      type: String,
      required: true,
    },
    audio: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Audios", AudiosSchema);
