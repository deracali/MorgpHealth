import React, { useContext } from 'react'
import { assets } from '../assets/assets_admin/assets'
import { NavLink } from 'react-router-dom'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'

export default function SideBar() {

    const {aToken} = useContext(AdminContext)
    const {dToken, doctorId} = useContext(DoctorContext)

  return (
    <div className='min-h-screen bg-white border-r'>
    { 
        aToken &&  <ul>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''} `} to={'/'}>
                    <img src={assets.home_icon} alt=''/>
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>

                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''} `}  to={'/all-appointment'}>
                    <img src={assets.appointment_icon} alt=''/>
                    <p className='hidden md:block'>Appointment</p>
                </NavLink>

                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''} `}  to={'/add-doctor'}>
                    <img src={assets.add_icon} alt=''/>
                    <p className='hidden md:block'>Add Doctor</p>
                </NavLink>

                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''} `}  to={'/doctor-list'}>
                    <img src={assets.people_icon} alt=''/>
                    <p className='hidden md:block'>Doctor List</p>
                </NavLink>
            </ul>
        }

{ 
        dToken &&  <ul>
                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''} `} to={`/doctor-dashboard/${doctorId}`}>
                    <img src={assets.home_icon} alt=''/>
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>

                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''} `}  to={`/doctor-appointment/${doctorId}`}>
                    <img src={assets.appointment_icon} alt=''/>
                    <p className='hidden md:block'>Appointment</p>
                </NavLink>

                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''} `}  to={`/doctor-profile/${doctorId}`}>
                    <img src={assets.add_icon} alt=''/>
                    <p className='hidden md:block'>Profile</p>
                </NavLink>
            </ul>
        }
    </div>
  )
}
