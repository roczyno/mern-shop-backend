import express from "express";
import {
  addPdf,
  deletePdf,
  downloadPdf,
  getAllPdf,
  getPdf,
  upload,
} from "../controllers/pdf.controller.js";
import { verifyTokenAndAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/find", getAllPdf);
router.get("/find/:id", getPdf);
router.delete("/delete/:id", verifyTokenAndAdmin, deletePdf);
router.post("/upload", upload.single("file"), verifyTokenAndAdmin, addPdf);
router.get("/download/:id", downloadPdf);

export default router;
