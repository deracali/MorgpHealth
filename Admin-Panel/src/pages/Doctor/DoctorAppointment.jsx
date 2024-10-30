import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets_admin/assets';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function DoctorAppointment() {
    const { dToken, cancelAppointment, completeAppointment } = useContext(DoctorContext);
    const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
    const [appointments, setAppointments] = useState([]);

    const navigate = useNavigate();
    const { id } = useParams();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/appointments/${id}`, {
                headers: { dToken }
            });
            if (data.success) {
                setAppointments(data.appointments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
            toast.error(error.response?.data?.message || 'An error occurred while fetching appointments.');
        }
    };

    const startVideoCall = (appointmentId) => {
        navigate(`/video-call/${appointmentId}`);
    };

    useEffect(() => {
        if (dToken) {
            getAppointments();
        }
    }, [dToken]);

    return (
        <div className='w-full max-w-6xl m-5'>
            <p className='mb-3 text-lg font-medium'>Appointment Details</p>

            <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
                <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
                    <p>#</p>
                    <p>Patient</p>
                    <p>Payment</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Fees</p>
                    <p>Action</p>
                </div>

                {[...appointments].reverse().map((item, index) => (
                    <div key={index} className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr] gap-1 item-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'>
                        <p className='max-sm:hidden'>{index + 1}</p>
                        <div className='flex items-center gap-2'>
                            <img className="w-8 rounded-full" src={item.userData.image} alt={item.userData.name} />
                            <p className='text-xs inline border border-primary px-2 rounded-full'>{item.userData.name}</p>
                        </div>
                        <p>{!item.payment ? "ONLINE" : "CASH"}</p>
                        <p>{calculateAge(item.userData.dob)}</p>
                        <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                        <p>{currency}{item.amount}</p>
                        {
                            item.cancelled 
                            ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                            : item.isCompleted
                            ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                            : <div className='flex items-center gap-2'>
                                <img className="cursor-pointer w-10" onClick={() => cancelAppointment(item._id)} src={assets.cancel_icon} alt='Cancel' />
                                <img className="cursor-pointer w-10" onClick={() => completeAppointment(item._id)} src={assets.tick_icon} alt='Confirm' />
                                <button
                                    className='text-white bg-blue-500 hover:bg-blue-600 py-1 px-2 rounded text-xs'
                                    onClick={() => startVideoCall(item._id)}
                                >
                                    Start Appointment
                                </button>
                            </div>
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}
