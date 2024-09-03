import express from "express";
import {
  getAll,
  createOrder
} from "./order.controller.js";
import {verifyToken} from "../../middleware/auth.js";

const router = express.Router();

router.get("/order", verifyToken, getAll);
router.post("/order", verifyToken, createOrder);

export default router;
