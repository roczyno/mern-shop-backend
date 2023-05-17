import express from "express";
import {
  addPdf,
  downloadPdf,
  getAllPdf,
  getPdf,
  upload,
} from "../controllers/pdf.controller.js";

const router = express.Router();

router.get("/find", getAllPdf);
router.get("/find/:id", getPdf);
router.post("/upload", upload.single("file"), addPdf);
router.get("/download/:id", downloadPdf);

export default router;
