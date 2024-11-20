import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { assets } from '../../assets/assets_admin/assets';
import { AppContext } from '../../context/AppContext';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import io from 'socket.io-client'; // Import Socket.IO client

export default function DoctorDashboard() {
    const { dToken, cancelAppointment, completeAppointment } = useContext(DoctorContext);
    const { currency, slotDateFormat } = useContext(AppContext);
    const [dashData, setDashData] = useState([]);
    const [chats, setChats] = useState([]);
    const [userProfiles, setUserProfiles] = useState({}); // To store user profiles
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [chatMessages, setChatMessages] = useState([]);
    const [messageContent, setMessageContent] = useState('');
    
    const { id: doctorId } = useParams(); // Extract doctorId from URL
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const socket = io(backendUrl); // Initialize Socket.IO client

    // Fetch dashboard data
    const getDashData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard/${doctorId}`, {
                headers: { dToken }
            });
            if (data.success) {
                setDashData(data.dashData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            toast.error(error.response?.data?.message || 'An error occurred while fetching dashboard data.');
        }
    };

    // Fetch chats
    const fetchChats = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/chat/doctor-chats/${doctorId}`, {
                headers: { dToken }
            });
            if (data.success) {
                setChats(data.chats);
                await fetchUserProfiles(data.chats); // Fetch user profiles after getting chats
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching chats:', error);
            toast.error(error.response?.data?.message || 'Failed to fetch chats');
        }
    };

    // Fetch user profiles based on chat user IDs
    const fetchUserProfiles = async (chats) => {
        try {
            const profiles = await Promise.all(
                chats.map(async (chat) => {
                    const userId = chat.user; // Use the user field to get the user ID

                    if (!userId) {
                        console.warn('User ID is missing for chat:', chat);
                        return null; // Skip this chat if userId is undefined
                    }

                    try {
                        const { data } = await axios.get(`${backendUrl}/api/user/get-profileId/${userId}`, {
                            headers: { dToken }
                        });

                        // Check if user data is available in the response
                        if (data.success && data.user) { // This checks the 'user' key
                            return { [userId]: data.user }; // Store user details with userId as the key
                        } else {
                            console.error(`Failed to fetch profile for userId ${userId}:`, data.message);
                            return { [userId]: undefined }; // Return undefined if the fetch fails
                        }
                    } catch (error) {
                        console.error(`Error fetching profile for userId ${userId}:`, error);
                        return { [userId]: undefined }; // Return undefined if the fetch fails
                    }
                })
            );

            // Filter out null profiles (those with missing userId or fetch errors)
            const validProfiles = profiles.filter(profile => profile !== null);
            const profilesObj = Object.assign({}, ...validProfiles);
            setUserProfiles(profilesObj); // Set user profiles in state
            console.log('User Profiles:', profilesObj); // Debugging line
        } catch (error) {
            console.error('Error fetching user profiles:', error);
            toast.error(error.response?.data?.message || 'Failed to fetch user profiles');
        }
    };

    // Select chat and fetch history
    const selectChat = async (chatId) => {
        setSelectedChatId(chatId);
        await fetchChatHistory(chatId);
    };

    // Fetch chat history for a selected chat
    const fetchChatHistory = async (chatId) => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/chat/${chatId}/history`, {
                headers: { dToken }
            });
            if (data.success) {
                setChatMessages(data.messages);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error loading chat history:', error);
            toast.error(error.response?.data?.message || 'Failed to load chat history');
        }
    };

    // Send message in chat
    const sendMessage = async () => {
        // Check if message content is provided
        if (!messageContent.trim()) return;
    
        // Check if the chat ID is available
        if (!selectedChatId) {
            toast.error('Chat ID is missing. Please start a chat first.');
            return;
        }
    
        // Set senderModel to 'Doctor' since this is for doctors
        const senderModel = 'Doctor'; // Hardcoded to 'Doctor' for this context
    
        // Emit message through WebSocket
        socket.emit('sendMessage', { selectedChatId, senderId: doctorId, content: messageContent });
    
        // Save message to the database
        try {
            const response = await fetch(`${backendUrl}/api/chat/${selectedChatId}/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    senderId: doctorId, // Assuming doctorId is defined and valid
                    senderModel, // Use 'Doctor'
                    content: messageContent,
                }),
            });
    
            // Check for errors in the response
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to send message');
            }
    
            // Optionally handle the response if needed
            const data = await response.json();
           
    
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    
        // Clear the input field after sending the message
        setMessageContent('');
    };
    

    // Listen for incoming messages from the server
    useEffect(() => {
        socket.on('receiveMessage', (message) => {
            setChatMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.off('receiveMessage'); // Cleanup listener on component unmount
        };
    }, []);

    useEffect(() => {
        if (dToken && doctorId) {
            getDashData();
            fetchChats();
        }
    }, [dToken, doctorId]);

    const handleUsernameClick = () => {
        setSelectedChatId(null); // Close the chat
        setChatMessages([]); // Clear chat messages
    };



      // Function to delete a chat
      const deleteChat = async (chatId) => {
        try {
            const { data } = await axios.delete(`${backendUrl}/api/chat/delete-chat/${chatId}`, {
                headers: { dToken }
            });
            if (data.success) {
                // Remove the chat from state
                setChats((prevChats) => prevChats.filter((chat) => chat._id !== chatId));
                toast.success('Chat deleted successfully');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error deleting chat:', error);
            toast.error(error.response?.data?.message || 'Failed to delete chat');
        }
    };





    return (
        <div className='m-5'>
            {/* Dashboard data display */}
            <div className='flex flex-wrap gap-3'>
                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-14' src={assets.earning_icon} alt='' />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{currency}{dashData.earnings}</p>
                        <p className='text-gray-400'>Earnings</p>
                    </div>
                </div>

                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-14' src={assets.appointments_icon} alt='' />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
                        <p className='text-gray-400'>Appointments</p>
                    </div>
                </div>

                <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                    <img className='w-14' src={assets.patients_icon} alt='' />
                    <div>
                        <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
                        <p className='text-gray-400'>Patients</p>
                    </div>
                </div>
            </div>

            {/* Latest bookings section */}
            <div className='bg-white'>
                <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
                    <img src={assets.list_icon} alt='' />
                    <p className='font-semibold'>Latest Bookings</p>
                </div>

                <div className='pt-4 border border-t-0'>
                    {dashData.latestAppointments?.map((item, index) => (
                        <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
                            <img className='rounded-full w-10' src={item.userData.image} alt='' />
                            <div className='flex-1 text-sm'>
                                <Link to={`/session/${item._id}`}  className='text-gray-800 font-medium'>{item.userData.name}</Link>
                                <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
                            </div>
                            {item.cancelled
                                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                                : item.isCompleted
                                    ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                                    : <div className='flex'>
                                        <img className="cursor-pointer w-10" onClick={() => cancelAppointment(item._id)} src={assets.cancel_icon} alt='Cancel' />
                                        <img className="cursor-pointer w-10" onClick={() => completeAppointment(item._id)} src={assets.tick_icon} alt='Confirm' />
                                    </div>
                            }
                        </div>
                    ))}
                </div>
            </div>

            <div className='bg-white mt-10 p-4 rounded border'>
    <h2 className='text-lg font-semibold'>Messages</h2>
    <div className='chat-list mt-4'>
        {chats.map((chat) => (
            <div key={chat._id} className='chat-item cursor-pointer p-2 border-b hover:bg-gray-100'>
                <p className='font-medium flex items-center justify-between'>
                    <span className='flex items-center' onClick={() => selectChat(chat._id)}>
                        {userProfiles[chat.user]?.name || 'User'}
                        <span className='ml-2 w-3 h-3 bg-green-500 rounded-full'></span>
                    </span>
                    <div>
                        <button
                            className='ml-4 bg-red-500 text-white rounded p-1 hover:bg-red-600'
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering the parent onClick
                                deleteChat(chat._id); // Delete the chat
                            }}
                        >
                            Delete
                        </button>
                        <button
                            className='ml-2 bg-gray-500 text-white rounded p-1 hover:bg-gray-600'
                            onClick={(e) => {
                                e.stopPropagation(); // Prevent triggering the parent onClick
                                handleUsernameClick(); // Close the chat
                            }}
                        >
                            Close
                        </button>
                    </div>
                </p>
                <p className='text-sm text-gray-500'>
                    {chat.lastMessage ? chat.lastMessage : 'No messages yet'}
                </p>
            </div>
        ))}
    </div>

    {selectedChatId && (
        <div className='chat-window mt-4'>
            {/* Display chat with the selected user's name or a message if no user is found */}
            {userProfiles[chats.find(chat => chat._id === selectedChatId)?.user] ? (
                <>
                    <h3 className='text-lg font-semibold cursor-pointer'>
                        Chat with {userProfiles[chats.find(chat => chat._id === selectedChatId)?.user]?.name}
                    </h3>
                    <div className="chat-messages border-t mt-2">
  {chatMessages.map((msg, index) => (
    <div
      key={index}
      className={`flex ${msg.senderModel === 'Doctor' ? 'justify-start' : 'justify-end'} p-2`}
    >
      <div
        className={`max-w-xs rounded-lg p-3 ${
          msg.senderModel === 'Doctor' ? 'bg-gray-200 text-black' : 'bg-blue-500 text-white'
        }`}
      >
        <p>{msg.content}</p>
      </div>
    </div>
  ))}
</div>
                    <div className='chat-input flex mt-2'>
                        <input
                            type='text'
                            value={messageContent}
                            onChange={(e) => setMessageContent(e.target.value)}
                            placeholder='Type your reply...'
                            className='flex-1 border rounded p-2'
                        />
                        <button onClick={sendMessage} className='ml-2 bg-blue-500 text-white rounded p-2'>Send</button>
                    </div>
                </>
            ) : (
                <p className='text-red-500'>No user</p> // Message shown if there is no user
            )}
        </div>
    )}
</div>

        </div>
    );
}
