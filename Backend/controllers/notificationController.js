import Notification from "../models/notificationModel.js";

 const createNotification = async (recipientId, recipientType, title, message) => {
  try {
    const notification = new Notification({
      recipientId,
      recipientType,
      title,
      message,
    });

    await notification.save();
    console.log("Notification created:", notification);
  } catch (error) {
    console.error("Error creating notification:", error.message);
  }
};


const fetchNotifications = async (recipientId, recipientType) => {
  try {
    const notifications = await Notification.find({
      recipientId,
      recipientType,
    }).sort({ timestamp: -1 }); // Sort by latest first
    return notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    throw error;
  }
};

export {fetchNotifications,createNotification}
