import express from "express";
import {
  addVideos,
  downloadVideo,
  getAllVideos,
  getVideo,
  upload,
} from "../controllers/video.controller.js";

const router = express.Router();

router.get("/find", getAllVideos);
router.get("/find/:id", getVideo);
router.post("/upload", upload.single("file"), addVideos);
router.get("/download/:id", downloadVideo);

export default router;
