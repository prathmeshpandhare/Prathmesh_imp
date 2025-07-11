import express from "express";
import {
  getNotifications,
  createNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/:userId", getNotifications);
router.post("/create", createNotification);

export default router;
