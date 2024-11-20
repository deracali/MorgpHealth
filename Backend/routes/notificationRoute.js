import express from "express";
import {
  createNotification,
  fetchNotifications
} from "../controllers/notificationController.js";

const notificationRoute = express.Router();

// Create a notification
notificationRoute.post("/create", createNotification);

// Get notifications for a recipient
notificationRoute.get("/:recipientId/:recipientType", fetchNotifications);

// Mark a notification as read
// notificationRoute.put("/read/:notificationId", markNotificationAsRead);

export default notificationRoute;
