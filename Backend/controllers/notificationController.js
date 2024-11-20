import Notification from "../models/notificationModel.js";

 const bookAppointment = async (req, res) => {
    try {
        const { userId, docId, slotDate, slotTime, concern, description } = req.body;

        // Fetch doctor data, excluding password field
        const docData = await doctorModel.findById(docId).select('-password');
        if (!docData) {
            return res.json({ success: false, message: "Doctor not found" });
        }

        if (!docData.available) {
            return res.json({ success: false, message: "Doctor not available" });
        }

        // Ensure slots_booked exists in doctor data
        let slots_booked = docData.slots_booked || {};

        // Check if the specific date is already booked
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot not available" });
            } else {
                slots_booked[slotDate].push(slotTime); // Add slot to the existing array
            }
        } else {
            slots_booked[slotDate] = [slotTime]; // Initialize the array with the new slot
        }

        // Fetch user data, excluding password field
        const userData = await userModel.findById(userId).select('-password');
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        // Remove slots_booked from docData as it's not needed in the appointment
        delete docData.slots_booked;

        // Prepare appointment data
        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            concern,
            description,
            data: Date.now() // Use Date.now() for timestamp
        };

        // Create a new appointment
        const newAppointment = new appointmentModel(appointmentData);

        // Save new appointment to the database
        await newAppointment.save();

        // Update the doctor's available slots in the database
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        // Send notifications
        const userNotificationMessage = `Your appointment with Dr. ${docData.name} has been successfully booked for ${slotDate} at ${slotTime}.`;
        const doctorNotificationMessage = `You have a new appointment with ${userData.name} on ${slotDate} at ${slotTime}.`;

        // Create notifications for both the user and the doctor
        await createNotification(userId, "User", "Appointment Booked", userNotificationMessage);
        await createNotification(docId, "Doctor", "New Appointment", doctorNotificationMessage);

        // Respond with success
        res.json({ success: true, message: "Appointment Booked", appointment: appointmentData });

    } catch (error) {
        console.error("Error occurred while booking appointment:", error);
        res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
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
