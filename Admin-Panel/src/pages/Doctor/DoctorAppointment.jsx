import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets_admin/assets';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

export default function DoctorAppointment() {
    const { dToken, cancelAppointment, completeAppointment } = useContext(DoctorContext);
    const { calculateAge, slotDateFormat, currency } = useContext(AppContext);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false); // Loading state for appointments
    const [page, setPage] = useState(1); // Page number for infinite scroll
    const [error, setError] = useState(null); // Error state
    const navigate = useNavigate();
    const { id } = useParams();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const getAppointments = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/api/doctor/appointments/${id}?page=${page}`, {
                headers: { dToken }
            });
            if (data.success) {
                if (page === 1) {
                    setAppointments(data.appointments); // First page, overwrite
                } else {
                    setAppointments((prev) => [...prev, ...data.appointments]); // Append subsequent pages
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setError(error.response?.data?.message || 'An error occurred while fetching appointments.');
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = debounce((e) => {
        const threshold = 100; // Trigger load more when near bottom
        const bottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + threshold;
        if (bottom && !loading) {
            setPage((prev) => prev + 1); // Load next page
        }
    }, 200); // Debounced scroll event

    const startVideoCall = (appointmentId) => {
        navigate(`/video-call/${appointmentId}`);
    };

    useEffect(() => {
        if (dToken) {
            getAppointments(); // Fetch appointments when token is available
        }
    }, [dToken, page]); // Re-fetch when page number changes

    if (error) {
        return (
            <div className="w-full max-w-6xl m-5">
                <p className="text-red-600">{error}</p>
                <button onClick={() => { setError(null); setPage(1); }} className="text-blue-500">Retry</button>
            </div>
        );
    }

    return (
        <div onScroll={handleScroll} className='w-full max-w-6xl m-5'>
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
                            <Link  to={`/session/${item._id}`} className='text-xs inline border border-primary px-2 rounded-full'>{item.userData.name}</Link>
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

                {loading && <div className="spinner">Loading...</div>}

                {!loading && appointments.length === 0 && <p>No appointments found.</p>}
            </div>
        </div>
    );
}
