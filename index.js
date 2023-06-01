import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import AuthRouter from "./routes/auth.route.js";
import ImagesRoute from "./routes/images.route.js";
import AudiosRoute from "./routes/audios.route.js";
import VideosRoute from "./routes/videos.route.js";
import PdfRoute from "./routes/pdf.route.js";
import sendEmailWithAttachmentRoute from "./utils/sendEmailWithAttachment.js";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

const main = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("connected to mongoDb successfully..");
};

//middlewares
app.use(express.json());
app.use(
  cors({
    // origin: [
    //   "https://file-server-admin.onrender.com",
    //   "https://heroic-cat-897292.netlify.app",
    // ],
  })
);
app.use(
  "/uploads/images",
  express.static(path.join(__dirname, "/uploads/images"))
);
app.use(
  "/uploads/videos",
  express.static(path.join(__dirname, "/uploads/videos"))
);
app.use("/uploads/pdf", express.static(path.join(__dirname, "/uploads/pdf")));
app.use(
  "/uploads/audios",
  express.static(path.join(__dirname, "/uploads/audios"))
);

app.use(express.static(path.join(__dirname, "build")));

//routes
app.use("/api/auth", AuthRouter);
app.use("/api/images", ImagesRoute);
app.use("/api/videos", VideosRoute);
app.use("/api/audios", AudiosRoute);
app.use("/api/pdf", PdfRoute);
app.use("/api/email", sendEmailWithAttachmentRoute);

app.listen(5000, () => {
  main();
  console.log("server running...");
});
