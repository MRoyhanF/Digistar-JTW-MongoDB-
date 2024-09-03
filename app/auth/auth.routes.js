import express from "express";
import {
  login,
  logout
} from "./auth.controller.js";
import {
  verifyToken
} from "../../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", verifyToken, logout);

export default router;
