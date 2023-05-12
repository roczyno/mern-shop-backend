import express from "express";
import { addPdf, getAllPdf } from "../controllers/pdf.controller.js";

const router = express.Router();

router.get("/", getAllPdf);
router.post("/", addPdf);

export default router;
