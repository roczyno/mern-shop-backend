import express from "express";
import {
  addPdf,
  deletePdf,
  downloadPdf,
  getAllPdf,
  getPdf,
  upload,
} from "../controllers/pdf.controller.js";
import {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../utils/verifyToken.js";

const router = express.Router();

router.get("/find", verifyTokenAndAuthorization, getAllPdf);
router.get("/find/:id", verifyTokenAndAuthorization, getPdf);
router.delete("/delete/:id", verifyTokenAndAdmin, deletePdf);
router.post("/upload", upload.single("file"), verifyTokenAndAdmin, addPdf);
router.get("/download/:id", verifyTokenAndAuthorization, downloadPdf);

export default router;
