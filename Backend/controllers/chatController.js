import Chat from '../models/chatModel.js';
import Message from '../models/messageModel.js';
import User from '../models/userModel.js';
import Doctor from '../models/doctorsModel.js';

// Start a new chat between a user and a doctor
const startChat = async (req, res) => {
  const { userId, doctorId } = req.body;

  try {
    console.log(`Received request to start chat between user ${userId} and doctor ${doctorId}`);

    // Check if a chat between the user and doctor already exists
    let chat = await Chat.findOne({ user: userId, doctor: doctorId });
    
    if (!chat) {
      console.log(`No existing chat found. Creating a new chat between user ${userId} and doctor ${doctorId}`);
      chat = new Chat({ user: userId, doctor: doctorId });
      await chat.save();
      console.log(`New chat created with chatId: ${chat._id}`);
    }

    res.status(200).json({ success: true, chatId: chat._id });
  } catch (error) {
    console.error('Error starting chat:', error);
    if (error.name === 'ValidationError') {
      console.error('Validation Error:', error.message); // Log validation specific errors
    }
    res.status(500).json({ success: false, error: 'Failed to start chat' });
  }
};



// Get chat history for a specific chat ID
const getChatHistory = async (req, res) => {
  const { chatId } = req.params;
  const { limit = 10, skip = 0 } = req.query; // Set default values for limit and skip

  try {
    // Fetch messages for a specific chat, paginated
    const messages = await Message.find({ chatId })
      .sort({ createdAt: 1 }) // Sort messages by creation date in descending order (newest first)
      .limit(parseInt(limit))   // Limit the number of messages
      .skip(parseInt(skip))     // Skip the number of messages based on the skip parameter
      .exec();

    // Send the messages as the response
    res.json({ messages });
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(500).json({ message: 'Failed to fetch chat history' });
  }
};


// Send a message in a specific chat
const sendMessage = async (req, res) => {
  const { chatId } = req.params; // chatId from URL parameter
  const { senderId, senderModel, content } = req.body; // senderId, senderModel, content from body

  console.log(`Received message for chatId: ${chatId}`);
  console.log(`Message content: ${content}`);
  console.log(`Sender ID: ${senderId}, Sender Model: ${senderModel}`);

  if (!senderId || !senderModel || !content) {
    return res.status(400).json({ error: 'Missing required fields: senderId, senderModel, content' });
  }

  try {
    const newMessage = await Message.create({ chatId, senderId, senderModel, content });
    console.log('Message saved to database:', newMessage);

    // Emit message to socket
    io.to(chatId).emit('receiveMessage', newMessage);

    // Return the new message as the response
    res.status(200).json({ message: 'Message sent', newMessage });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};



// Get all chats for a specific doctor
const getDoctorChats = async (req, res) => {
    try {
        const { doctorId } = req.params;

        // Corrected: Use { doctor: doctorId } to match the field name in the schema
        const doctorChats = await Chat.find({ doctor: doctorId })           .exec();

        res.json({ success: true, chats: doctorChats });
    } catch (error) {
        console.error('Error fetching doctor chats:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch doctor chats' });
    }
};




// Delete a chat and its associated messages
const deleteChat = async (req, res) => {
    const { chatId } = req.params;

    try {
        // Delete messages associated with the chat
        await Message.deleteMany({ chat: chatId });

        // Delete the chat
        await Chat.findByIdAndDelete(chatId);

        res.status(200).json({ success: true, message: 'Chat deleted successfully' });
    } catch (error) {
        console.error('Error deleting chat:', error);
        res.status(500).json({ success: false, error: 'Failed to delete chat' });
    }
};

export { startChat, getChatHistory, sendMessage, getDoctorChats, deleteChat };
