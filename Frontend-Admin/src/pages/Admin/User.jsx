import React from 'react'
import UserDashboard from './UserPanel'
import SideBar from '../../components/SideBar'


export default function User() {
  return (
    <div className="bg-[#F8F9FD]">
       <div className="flex items-start">
        <SideBar/>
        <UserDashboard/>
       </div>
    </div> 
  )
}
