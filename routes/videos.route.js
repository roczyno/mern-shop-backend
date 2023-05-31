import express from "express";
import {
  addVideos,
  deleteVideos,
  downloadVideo,
  getAllVideos,
  getVideo,
  upload,
} from "../controllers/video.controller.js";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../utils/verifyToken.js";

const router = express.Router();
router.get("/find", getAllVideos);
router.get("/find/:id", verifyTokenAndAuthorization, getVideo);
router.delete("/delete/:id", verifyTokenAndAdmin, deleteVideos);
router.post("/upload", upload.single("file"), verifyTokenAndAdmin, addVideos);
router.get("/download/:id", verifyTokenAndAuthorization, downloadVideo);

export default router;
