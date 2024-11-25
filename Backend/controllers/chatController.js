import Chat from '../models/chatModel.js';
import Message from '../models/messageModel.js';
import User from '../models/userModel.js';
import Doctor from '../models/doctorsModel.js';

// Start a new chat between a user and a doctor
const startChat = async (req, res) => {
    const { userId, doctorId } = req.body;
    
    try {
        // Check if a chat between the user and doctor already exists
        let chat = await Chat.findOne({ user: userId, doctor: doctorId });
        
        // If no existing chat, create a new one
        if (!chat) {
            chat = new Chat({ user: userId, doctor: doctorId });
            await chat.save();
        }

        res.status(200).json({ success: true, chatId: chat._id });
    } catch (error) {
        console.error('Error starting chat:', error);
        res.status(500).json({ success: false, error: 'Failed to start chat' });
    }
};


// Get chat history for a specific chat ID
const getChatHistory = async (req, res) => {
    const { chatId } = req.params;
    const { limit = 10, skip = 0 } = req.query; // Default to loading 10 messages at a time

    try {
        const messages = await Message.find({ chat: chatId })
            .sort({ createdAt: 1 }) // Sort by most recent messages first
            .skip(Number(skip)) // Skip messages that have already been loaded
            .limit(Number(limit)) // Limit the number of messages loaded
            .populate('sender', 'name'); // Populate sender details for context

        res.status(200).json({ success: true, messages });
    } catch (error) {
        console.error('Error retrieving chat history:', error);
        res.status(500).json({ success: false, error: 'Failed to retrieve chat history' });
    }
};


// Send a message in a specific chat
const sendMessage = async (req, res) => {
    const { chatId } = req.params;
    const { senderId, senderModel, content } = req.body;

    try {
        const message = new Message({
            chat: chatId,
            sender: senderId,
            senderModel,
            content,
            createdAt: Date.now()
        });
        
        await message.save();

        // Update the chat's last message content and timestamp
        await Chat.findByIdAndUpdate(chatId, {
            lastMessage: content,
            updatedAt: Date.now()
        });

        res.status(201).json({ success: true, message });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ success: false, error: 'Failed to send message' });
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
