import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import {loadStripe} from "@stripe/stripe-js";

export default function MyAppointment() {
    const [appointments, setAppointments] = useState([]);
    const navigate = useNavigate();
    const months = ["", "Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_');
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
    };
    const { backendUrl, token, getDoctorData, userData } = useContext(AppContext);
  

    const { id } = useParams();
    const getUserAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}api/user/appointments/${id}`, { headers: { token } });
            if (data.success) {
                setAppointments(data.appointments.reverse());
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + 'api/user/cancel-appointment', { appointmentId }, { headers: { token } });
            if (data.success) {
                getUserAppointments();
                getDoctorData();
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getUserAppointments();
    }, []);

console.log(appointments)

    const handleToken = async (item) => {
        try {
            const stripe = await loadStripe("pk_test_51QN8mWG2ozhLuxUAf8fdoD3MqAQnfNsZZoZdbc1fRx1fHUWRbpLjbGfdeR5VEAGOVCAUqH9hrlaJPQ5lEpAmrt7q00kPKajlEa");
    
           
    
            // Ensure `item` has the correct structure
            const docEmail = item.docData?.email || "Unknown Doctor"; // Fallback if `name` is missing
            const amount = parseInt(item.amount) * 100; // Convert amount to cents
    
            const response = await fetch('https://morgphealth.onrender.com/create-intent', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amount,
                    docEmail,
                    userName: userData.name,
                    userEmail: userData.email,
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const session = await response.json();
    
            if (session.id) {
                const result = await stripe.redirectToCheckout({
                    sessionId: session.id,
                });
    
                if (result.error) {
                    console.error('Stripe Checkout Error:', result.error.message);
                }
            } else {
                console.error('Session ID not received:', session);
            }
        } catch (error) {
            console.error('Error in handleToken:', error.message);
        }
    };
    

    return (
        <div className='mb-12 mt-12'>
            <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My Appointments</p>
            <div>
                {appointments.slice(0, 3).map((item, index) => (
                    <div className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b" key={index}>
                        <div>
                            <img className="w-32 bg-indigo-50" src={item.docData.image} alt="" />
                        </div>
                        <div className="flex-1 text-sm text-zinc-600">
                            <p className="text-neutral-800 font-semibold">{item.docData.name}</p>
                            <p>{item.docDataspeciality}</p>
                            <p className="text-zinc-700 font-medium mt-1">Address:</p>
                            <p className="text-xs">{item.docData.address.line1}</p>
                            <p className="text-xs">{item.docData.address.line2}</p>
                            <p className="text-xs mt-1">
                                <span className="text-sm text-neutral-700 font-medium">Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
                            </p>
                        </div>
                        <div></div>
                        <div className="flex flex-col gap-2 justify-end">
                        {!item.cancelled && !item.isCompleted && (
    <button
        className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-300"
        onClick={() => handleToken(item)}  // Attach the handleToken function here
    >
        Pay Online
    </button>
)}
                            {!item.cancelled && !item.isCompleted && (
                                <button onClick={() => cancelAppointment(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300">
                                    Cancel Appointment
                                </button>
                            )}
                            {/* {!item.cancelled && !item.isCompleted && (
                                <button
                                    onClick={() => navigate(`/video-call/${item._id}`)} // Directs to video call route
                                    className="text-sm text-blue-500 text-center sm:min-w-48 py-2 border border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300"
                                >
                                    Join Meeting
                                </button>
                            )} */}
                            {item.cancelled && (
                                <button className="sm:min-w-48 py-2 rounded border border-red-500 text-red-500">
                                    Appointment Cancelled
                                </button>
                            )}
                            {item.isCompleted && (
                                <button onClick={() => navigate(`/session/${item.docData._id}/${item._id}`)} className="sm:min-w-48 py-2 rounded border border-green-500 text-green-500">
                                    View Session
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
