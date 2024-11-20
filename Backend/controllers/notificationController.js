import Notification from "../models/notificationModel.js";


 // Controller to handle creating a notification
const createNotification = async (req, res) => {
  const { recipientId, recipientType, title, message } = req.body;

  // Check if all required fields are present
  if (!recipientId || !recipientType || !title || !message) {
    return res.status(400).send("Missing required fields");
  }

  try {
    // Create the new notification object
    const notification = new Notification({
      recipientId,
      recipientType,
      title,
      message,
    });

    // Save the notification to the database
    await notification.save();

    // Respond with success
    res.status(201).json({
      message: "Notification created successfully",
      notification: notification,
    });
  } catch (error) {
    console.error("Error creating notification:", error.message);
    res.status(500).send("Error creating notification");
  }
};



// Controller to handle fetching notifications
const fetchNotifications = async (req, res) => {
  const { recipientId, recipientType } = req.params;  // or req.body depending on the request method

  if (!recipientId || !recipientType) {
    return res.status(400).send("Missing recipientId or recipientType");
  }

  try {
    // Fetch notifications based on recipientId and recipientType
    const notifications = await Notification.find({
      recipientId,
      recipientType,
    }).sort({ timestamp: -1 }); // Sort by latest first

    // Return the notifications in the response
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error.message);
    res.status(500).send("Error fetching notifications");
  }
};

export {fetchNotifications,createNotification}
