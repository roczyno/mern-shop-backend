import express from "express";
import {
  addAudios,
  deleteAudio,
  downloadAudio,
  getAllAudios,
  getAudio,
  upload,
} from "../controllers/audio.controller.js";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../utils/verifyToken.js";

const router = express.Router();

router.get("/find", getAllAudios);
router.get("/find/:id", verifyTokenAndAuthorization, getAudio);
router.delete("/delete/:id", verifyTokenAndAdmin, deleteAudio);
router.post("/upload", upload.single("file"), verifyTokenAndAdmin, addAudios);
router.get("/download/:id", verifyTokenAndAuthorization, downloadAudio);

export default router;
