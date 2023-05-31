import express from "express";
import {
  addAudios,
  deleteAudio,
  downloadAudio,
  getAllAudios,
  getAudio,
  upload,
} from "../controllers/audio.controller.js";
import { verifyTokenAndAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/find", getAllAudios);
router.get("/find/:id", getAudio);
router.delete("/delete/:id", verifyTokenAndAdmin, deleteAudio);
router.post("/upload", upload.single("file"), verifyTokenAndAdmin, addAudios);
router.get("/download/:id", downloadAudio);

export default router;
