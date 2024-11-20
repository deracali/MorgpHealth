import express from "express";
import {
  createNotification,
  fetchNotifications
} from "../controllers/notificationController.js";

const notificationRouter = express.Router();

// Create a notification
notificationRoute.post("/create", createNotification);

// Get notifications for a recipient
notificationRoute.get("/:recipientId/:recipientType", getNotifications);

// Mark a notification as read
notificationRoute.put("/read/:notificationId", markNotificationAsRead);

export default notificationRoute;
