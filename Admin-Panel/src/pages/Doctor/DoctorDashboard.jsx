import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { assets } from '../../assets/assets_admin/assets'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

export default function DoctorDashboard() {
  
  const {dToken,cancelAppointment,completeAppointment} = useContext(DoctorContext)
  const {currency, slotDateFormat} = useContext(AppContext)
  const [dashData, setDashData] = useState([]);

  const { id } = useParams(); // Get appointment ID from URL
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Ensure you have the backend URL

  const getDashData = async () => {
      try {
          const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard/${id}`, {
              headers: { dToken }
          });
          if (data.success) {
              setDashData(data.dashData); // No need to reverse here
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
          getDashData(); // Call getAppointments without parameters
      }
  }, [dToken]); // Only depend on dToken



  return dashData && (
    <div className='m-5'>
        <div className='flex flex-wrap gap-3'>

<div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
  <img className='w-14' src={assets.earning_icon} alt=''/>
  <div>
    <p className='text-xl font-semibold text-gray-600'>{currency}{dashData.earnings}</p>
    <p className='text-gray-400'>Earnings</p>
  </div>
</div>

<div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
  <img className='w-14' src={assets.appointments_icon} alt=''/>
  <div>
    <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
    <p className='text-gray-400'>Appointments</p>
  </div>
</div>

<div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
  <img className='w-14' src={assets.patients_icon} alt=''/>
  <div>
    <p className='text-xl font-semibold text-gray-600'>{dashData.patients}</p>
    <p className='text-gray-400'>Patients</p>
  </div>
</div>
</div>


<div className='bg-white'>

<div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
  <img src={assets.list_icon} alt=''/>
  <p className='font-semibold'>Latest Bookings</p>
</div>

<div className='pt-4 border border-t-0'>
  {
    dashData.latestAppointments?.map((item, index)=> (
      <div className='flex items-center px-6 py-3 gap-3 hover-bg-gray-100' key={index}>
        <img className='rounded-full w-10' src={item.userData.image} alt=''/>
        <div className='flex-1 text-sm'>
          <p className='text-gray-800 font-medium'>{item.userData.name}</p>
          <p className='text-gray-600'>{slotDateFormat(item.slotDate)}</p>
        </div>
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
    ))
  }
</div>
</div>
    </div>
  )
}
