import express from "express";
import {
  addImages,
  downloadImage,
  getAllImages,
  getImage,
  upload,
} from "../controllers/images.controller.js";

const router = express.Router();

router.get("/find", getAllImages);
router.get("/find/:id", getImage);
router.post("/upload", upload.single("file"), addImages);
router.get("/download/:id", downloadImage);

export default router;
