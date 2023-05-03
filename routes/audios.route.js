import express from "express";
import { addAudio, getAllAudio } from "../controllers/audio.controller.js";

const router = express.Router();

router.get("/", getAllAudio);
router.post("/", addAudio);

export default router;
