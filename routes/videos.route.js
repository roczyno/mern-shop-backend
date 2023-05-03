import express from "express";

import { addVideo, getAllVideos } from "../controllers/video.controller.js";

const router = express.Router();

router.get("/", getAllVideos);
router.post("/", addVideo);

export default router;
