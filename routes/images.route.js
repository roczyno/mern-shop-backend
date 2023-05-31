import express from "express";
import {
  addImages,
  deleteImages,
  downloadImage,
  getAllImages,
  getImage,
  upload,
} from "../controllers/images.controller.js";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../utils/verifyToken.js";

const router = express.Router();

router.get("/find", getAllImages);
router.get("/find/:id", verifyTokenAndAuthorization, getImage);
router.delete("/delete/:id", verifyTokenAndAdmin, deleteImages);
router.post("/upload", upload.single("file"), verifyTokenAndAdmin, addImages);
router.get("/download/:id", verifyTokenAndAuthorization, downloadImage);

export default router;
