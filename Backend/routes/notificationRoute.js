import express from "express";
import {
  createNotification,
  getNotifications,
  markNotificationAsRead,
} from "../controllers/notificationController.js";

const NotificationRouter = express.Router();

// Create a notification
NotificationRouter.post("/create", createNotification);

// Get notifications for a recipient
NotificationRouter.get("/:recipientId/:recipientType", getNotifications);

// Mark a notification as read
NotificationRouter.put("/read/:notificationId", markNotificationAsRead);

export default NotificationRouter;
