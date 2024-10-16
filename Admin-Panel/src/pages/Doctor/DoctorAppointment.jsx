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
    
    const navigate = useNavigate()

    const { id } = useParams(); // Get appointment ID from URL
    const backendUrl = import.meta.env.VITE_BACKEND_URL; // Ensure you have the backend URL

    const getAppointments = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/appointments/${id}`, {
                headers: { dToken }
            });
            if (data.success) {
                setAppointments(data.appointments); // No need to reverse here
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error); // Log the error
            toast.error(error.response?.data?.message || 'An error occurred while fetching appointments.');
        }
    };

    useEffect(() => {
        if (dToken) {
            getAppointments(); // Call getAppointments without parameters
        }
    }, [dToken]); // Only depend on dToken

    
    return (
        <div className='w-full max-w-6xl m-5'>
            <p className='mb-3 text-lg font-medium'>Appointment Details</p>

            <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
                <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
                    <p>#</p>
                    <p>Patient</p>
                    <p>Payment</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Fees</p>
                    <p>Action</p>
                </div>
        
        {[...appointments].reverse().map((item, index) => (
        <div  onClick={()=>navigate(`/session/${item._id}`)} key={index} className='flex cursor-pointer flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 item-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'>
        <p className='max-sm:hidden'>{index + 1}</p>
        <div className='flex items-center gap-2'>
            <img className="w-8 rounded-full" src={item.userData.image} alt={item.userData.name} />
            <p className='text-xs inline border border-primary px-2 rounded-full'>{item.userData.name}</p>
        </div>
        <p>{!item.payment ? "ONLINE" : "CASH"}</p> {/* Fixed payment display */}
        <p>{calculateAge(item.userData.dob)}</p>
        <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
        <p>{currency}{item.amount}</p>
        {
            item.cancelled 
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
    );
}
