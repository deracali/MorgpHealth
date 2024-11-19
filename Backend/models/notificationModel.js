import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "recipientType",
    },
    recipientType: {
      type: String,
      required: true,
      enum: ["User", "Doctor"], // Define valid recipient types
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false, // Track if the notification has been read
    },
    timestamp: {
      type: Date,
      default: Date.now, // Automatically set the timestamp
    },
  },
  { timestamps: true } // Automatically manage `createdAt` and `updatedAt`
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
