import express from "express";
import {
  login,
  passwordResetLink,
  register,
  resetPassword,
  verifyPasswordResetLink,
  verifyToken,
} from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/:id/verify/:token/", verifyToken);
router.post("/password-reset", passwordResetLink);
router.get("/password-reset/:id/:token", verifyPasswordResetLink);
router.post("/password-reset/:id/:token", resetPassword);

export default router;
