import express from "express";
import { addImages, getAllImages } from "../controllers/images.controller.js";

const router = express.Router();

router.get("/", getAllImages);
router.post("/", addImages);

export default router;
