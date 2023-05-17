import express from "express";
import {
  addAudios,
  downloadAudio,
  getAllAudios,
  getAudio,
  upload,
} from "../controllers/audio.controller.js";

const router = express.Router();

router.get("/find", getAllAudios);
router.get("/find/:id", getAudio);
router.post("/upload", upload.single("file"), addAudios);
router.get("/download/:id", downloadAudio);

export default router;
