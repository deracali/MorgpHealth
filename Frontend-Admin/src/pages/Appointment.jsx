import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import axios from 'axios';
import { toast } from 'react-toastify';
import { io } from 'socket.io-client'; // Import Socket.IO client

export default function Appointment() {
  const { docId } = useParams(); // Capture docId from route params
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData, userData } = useContext(AppContext);
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [showChatPopup, setShowChatPopup] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const [chatId, setChatId] = useState(null); // Added to store chatId
  const socket = io(backendUrl); // Initialize socket connection
  const [selectedService, setSelectedService] = useState('');
  const [serviceFee, setServiceFee] = useState(0);
  const [communicationMethod, setCommunicationMethod] = useState('video-call');

  // Fetch doctor info based on docId

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    if (!docInfo) {
      toast.error('Doctor not found!');
      return;
    }
    setDocInfo(docInfo);

    // Pre-select the first service (if available)
    if (docInfo.services && docInfo.services.length > 0) {
      setSelectedService(docInfo.services[0].name);
      setServiceFee(docInfo.services[0].fee);
    }
  };

  
  const handleServiceChange = (e) => {
    const selectedServiceName = e.target.value;
    setSelectedService(selectedServiceName);

    // Update the service fee based on the selected service
    const service = docInfo.services.find((s) => s.name === selectedServiceName);
    if (service) {
      setServiceFee(service.fee);
    }
  };



  // Get available slots for the doctor
  const getAvailableSlots = async () => {
    setDocSlots([]);

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable = !(docInfo?.slots_booked?.[slotDate]?.includes(slotTime));

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      setDocSlots(prev => ([...prev, timeSlots]));
    }
  };

  // Book an appointment with the selected doctor
  const bookAppointment = async () => {
    if (!token) {
      return navigate('/login');
    }

    try {
      const date = docSlots[slotIndex][0].datetime;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + "_" + year;

      const { data } = await axios.post(backendUrl + 'api/user/book-appointment', {  docId: docInfo._id,
        slotDate,
        slotTime,
        concern: selectedService,
        amount: serviceFee,
        type: communicationMethod, }, { headers: { token } });

      if (data.success) {
        getDoctorsData();
        navigate(`/my-appointments/${userData._id}`);
        toast.success("Session Booked");
      } else {
        toast.error(data.message || "Failed to book appointment");
      }

    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("An error occurred while booking the appointment.");
    }
  };

  // Start chat with the doctor
  const startChat = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}api/chat/start`,
        { userId: userData._id, doctorId: docId },
        { headers: { token } }
      );

      // Check if chatId is returned
      if (data.chatId) {
        setChatId(data.chatId); // Set chatId here
        setShowChatPopup(true);
        fetchChatHistory(data.chatId);
      } else {
        toast.error('Failed to retrieve chat ID');
      }
    } catch (error) {
      toast.error('Failed to start chat');
      console.error("Error starting chat:", error);
    }
  };

  // Fetch chat history for the current chat
  const fetchChatHistory = async (chatId) => {
    if (!chatId) {
      console.error('chatId is undefined or null');
      return;
    }

    try {
      const { data } = await axios.get(`${backendUrl}api/chat/${chatId}/history`, {
        headers: { token }
      });
      
      if (data.messages) {
        setChatMessages(data.messages);
      } else {
        toast.error('No messages found for this chat');
      }
    } catch (error) {
      toast.error('Failed to load chat history');
      console.error("Error fetching chat history:", error);
    }
  };

  // Send message in chat
  const sendMessage = async () => {
    if (!messageContent.trim()) return;

    if (!chatId) {
        toast.error('Chat ID is missing. Please start a chat first.');
        return;
    }

    // Set senderModel to match the schema's enum values
    const senderModel = 'User'; // Adjust logic based on your application

    // Emit message through WebSocket
    socket.emit('sendMessage', { chatId, senderId: userData._id, content: messageContent });

    // Save message to the database
    try {
        const response = await fetch(`${backendUrl}api/chat/${chatId}/message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                senderId: userData._id,
                senderModel, // Use 'User' or 'Doctor' based on role
                content: messageContent,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to send message');
        }

        const data = await response.json();
        setMessageContent('');
      

    } catch (error) {
        toast.error(`Error: ${error.message}`);
    }
};

  
  // Listen for incoming messages
  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setChatMessages((prevMessages) => [...prevMessages, message]);
    });
  
    // Cleanup on component unmount
    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  
  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]); // Ensure that docId is part of the dependency array

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  return docInfo && (
    <div className='mb-20'>
    <div className="flex flex-col sm:flex-row gap-4">
      <div>
        <img
          className="bg-primary w-full sm:max-w-72 rounded-lg"
          src={docInfo.image}
          alt={docInfo.name}
        />
      </div>

      <div className="flex-1 border border-gray-400 rounded-lg p-8 bg-white mx-2 sm:mx-0 mt-[80px] sm:mt-0">
        <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
          {docInfo.name}
        </p>
        <p className="text-gray-600 mt-3">Appointment fee: ${serviceFee}</p>

        {/* Services Dropdown */}
        <h4 className="mt-4">Select Service</h4>
        <div>
          <select
            className="form-control"
            value={selectedService}
            onChange={handleServiceChange}
          >
            {docInfo.services.map((service, index) => (
              <option key={index} value={service.name}>
                {service.name} (${service.fee})
              </option>
            ))}
          </select>
        </div>

        {/* Communication Preference */}
        <h4 className="mt-4">Select Communication Preference</h4>
        <div className="form-group" style={{ maxWidth: '300px' }}>
          <label htmlFor="communication-method">Preferred Method</label>
          <select
            id="communication-method"
            className="form-control"
            value={communicationMethod}
            onChange={(e) => setCommunicationMethod(e.target.value)}
          >
            <option value="video-call">Video Call</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="phone">Phone</option>
          </select>
        </div>

        {/* Booking Slots */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {docSlots.length && docSlots.map((item, index) => (
            <div 
              className={`text-center py-2 px-3 border rounded-lg cursor-pointer ${index === slotIndex ? 'bg-blue-500 text-white' : 'text-gray-600'}`} 
              onClick={() => { setSlotIndex(index); setSlotTime(item[0].time); }}
              key={index}
            >
              <span>{daysOfWeek[index]}</span>
              <span className='block text-xs'>{item[0].time}</span>
            </div>
          ))}
          </div>

          <button
            onClick={bookAppointment}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}
