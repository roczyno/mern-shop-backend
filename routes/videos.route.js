import express from "express";
import {
  addVideos,
  deleteVideos,
  downloadVideo,
  getAllVideos,
  getVideo,
  upload,
} from "../controllers/video.controller.js";
import { verifyTokenAndAdmin } from "../utils/verifyToken.js";

const router = express.Router();
router.get("/find", getAllVideos);
router.get("/find/:id", getVideo);
router.delete("/delete/:id", verifyTokenAndAdmin, deleteVideos);
router.post("/upload", upload.single("file"), verifyTokenAndAdmin, addVideos);
router.get("/download/:id", downloadVideo);

export default router;
