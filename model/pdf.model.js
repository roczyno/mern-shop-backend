import mongoose from "mongoose";

const PdfSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
    file_mimetype: {
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

export default mongoose.model("Pdf", PdfSchema);
