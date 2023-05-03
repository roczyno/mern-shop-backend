import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import AuthRouter from "./routes/auth.route.js";
import ImagesRoute from "./routes/images.route.js";
import AudiosRoute from "./routes/audios.route.js";
import VideosRoute from "./routes/videos.route.js";
import PdfRoute from "./routes/pdf.route.js";

dotenv.config();
const app = express();

const main = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("connected to mongoDb successfully..");
};

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/auth", AuthRouter);
app.use("/api/images", ImagesRoute);
app.use("/api/videos", VideosRoute);
app.use("/api/audio", AudiosRoute);
app.use("/api/pdf", PdfRoute);

app.listen(5000, () => {
  main();
  console.log("server running...");
});
