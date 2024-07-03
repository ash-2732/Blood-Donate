import express from "express";
import {
  registerController,
  loginController,
  currentUserController,
} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

//routes
//register
router.post("/register", registerController);
//login
router.post("/login", loginController);
// current user
router.get("/current-user", authMiddleware , currentUserController)

export default router;
