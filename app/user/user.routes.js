import express from "express";
import {
  index,
  users,
  createUser,
  deleteUser
} from "./user.controller.js";

const router = express.Router();

router.get("/", index);
router.get("/users", users);
router.post("/users", createUser);
router.delete("/users/:id", deleteUser);

export default router;
